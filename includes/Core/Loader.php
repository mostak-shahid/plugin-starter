<?php
/**
 * Hooks Loader.
 */

namespace PluginStarter\Core;

class Loader {
    
    /**
     * Actions registered with WordPress.
     *
     * @var array
     */
    private $actions = [];

    /**
     * Filters registered with WordPress.
     *
     * @var array
     */
    private $filters = [];

    /**
     * Add an action hook.
     *
     * @param string $hook WordPress hook name.
     * @param object $component Component object.
     * @param string $callback Callback method name.
     * @param int $priority Hook priority.
     * @param int $accepted_args Number of accepted arguments.
     */
    public function add_action($hook, $component, $callback, $priority = 10, $accepted_args = 1) {
        $this->actions = $this->add($this->actions, $hook, $component, $callback, $priority, $accepted_args);
    }

    /**
     * Add a filter hook.
     *
     * @param string $hook WordPress hook name.
     * @param object $component Component object.
     * @param string $callback Callback method name.
     * @param int $priority Hook priority.
     * @param int $accepted_args Number of accepted arguments.
     */
    public function add_filter($hook, $component, $callback, $priority = 10, $accepted_args = 1) {
        $this->filters = $this->add($this->filters, $hook, $component, $callback, $priority, $accepted_args);
    }

    /**
     * Add hook to collection.
     *
     * @param array $hooks Hooks collection.
     * @param string $hook Hook name.
     * @param object $component Component object.
     * @param string $callback Callback method name.
     * @param int $priority Hook priority.
     * @param int $accepted_args Number of accepted arguments.
     * @return array
     */
    private function add($hooks, $hook, $component, $callback, $priority, $accepted_args) {
        $hooks[] = [
            'hook' => $hook,
            'component' => $component,
            'callback' => $callback,
            'priority' => $priority,
            'accepted_args' => $accepted_args,
        ];
        return $hooks;
    }

    /**
     * Register hooks with WordPress.
     */
    public function run() {
        foreach ($this->filters as $hook) {
            add_filter(
                $hook['hook'],
                [$hook['component'], $hook['callback']],
                $hook['priority'],
                $hook['accepted_args']
            );
        }

        foreach ($this->actions as $hook) {
            add_action(
                $hook['hook'],
                [$hook['component'], $hook['callback']],
                $hook['priority'],
                $hook['accepted_args']
            );
        }
    }
}