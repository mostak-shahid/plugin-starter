<?php
/**
 * Dependency Injection Container.
 */

namespace PluginStarter\Core;

class Container {
    
    /**
     * Registered services.
     *
     * @var array
     */
    private $services = [];

    /**
     * Singleton instances.
     *
     * @var array
     */
    private $instances = [];

    /**
     * Register a service.
     *
     * @param string $name Service name.
     * @param callable $resolver Service resolver.
     */
    public function bind($name, $resolver) {
        $this->services[$name] = [
            'resolver' => $resolver,
            'singleton' => false,
        ];
    }

    /**
     * Register a singleton service.
     *
     * @param string $name Service name.
     * @param callable $resolver Service resolver.
     */
    public function singleton($name, $resolver) {
        $this->services[$name] = [
            'resolver' => $resolver,
            'singleton' => true,
        ];
    }

    /**
     * Resolve a service.
     *
     * @param string $name Service name.
     * @return mixed
     */
    public function make($name) {
        // Return existing singleton instance.
        if (isset($this->instances[$name])) {
            return $this->instances[$name];
        }

        // Check if service is registered.
        if (!isset($this->services[$name])) {
            // Try to auto-resolve class.
            if (class_exists($name)) {
                return $this->resolve($name);
            }
            throw new \Exception("Service {$name} not found in container.");
        }

        $service = $this->services[$name];
        $instance = $service['resolver']($this);

        // Store singleton instance.
        if ($service['singleton']) {
            $this->instances[$name] = $instance;
        }

        return $instance;
    }

    /**
     * Auto-resolve a class with its dependencies.
     *
     * @param string $class Class name.
     * @return object
     */
    private function resolve($class) {
        $reflection = new \ReflectionClass($class);
        
        if (!$reflection->isInstantiable()) {
            throw new \Exception("Class {$class} is not instantiable.");
        }

        $constructor = $reflection->getConstructor();

        if (null === $constructor) {
            return new $class;
        }

        $parameters = $constructor->getParameters();
        $dependencies = $this->resolve_dependencies($parameters);

        return $reflection->newInstanceArgs($dependencies);
    }

    /**
     * Resolve constructor dependencies.
     *
     * @param array $parameters Constructor parameters.
     * @return array
     */
    private function resolve_dependencies($parameters) {
        $dependencies = [];

        foreach ($parameters as $parameter) {
            $type = $parameter->getType();

            if (null === $type || $type->isBuiltin()) {
                if ($parameter->isDefaultValueAvailable()) {
                    $dependencies[] = $parameter->getDefaultValue();
                } else {
                    throw new \Exception("Cannot resolve parameter {$parameter->getName()}");
                }
            } else {
                $dependencies[] = $this->make($type->getName());
            }
        }

        return $dependencies;
    }

    /**
     * Check if service exists.
     *
     * @param string $name Service name.
     * @return bool
     */
    public function has($name) {
        return isset($this->services[$name]) || isset($this->instances[$name]);
    }
}