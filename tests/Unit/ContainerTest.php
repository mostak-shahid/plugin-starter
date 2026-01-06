<?php
/**
 * Container Test.
 */

namespace PluginStarter\Tests\Unit;

use PHPUnit\Framework\TestCase;
use PluginStarter\Core\Container;

class ContainerTest extends TestCase {
    
    private $container;

    public function setUp(): void {
        parent::setUp();
        $this->container = new Container();
    }

    public function test_bind_and_make() {
        $this->container->bind('test', function() {
            return 'test value';
        });

        $result = $this->container->make('test');
        $this->assertEquals('test value', $result);
    }

    public function test_singleton() {
        $this->container->singleton('counter', function() {
            static $count = 0;
            return ++$count;
        });

        $first = $this->container->make('counter');
        $second = $this->container->make('counter');

        $this->assertEquals($first, $second);
    }

    public function test_has() {
        $this->container->bind('test', function() {
            return 'value';
        });

        $this->assertTrue($this->container->has('test'));
        $this->assertFalse($this->container->has('nonexistent'));
    }

    public function test_auto_resolve() {
        $instance = $this->container->make(TestClass::class);
        $this->assertInstanceOf(TestClass::class, $instance);
    }
}

class TestClass {
    public function __construct() {}
}