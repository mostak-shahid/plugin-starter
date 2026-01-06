<?php
/**
 * Logger Test.
 */

namespace PluginStarter\Tests\Unit;

use PHPUnit\Framework\TestCase;
use PluginStarter\Logging\Logger;

class LoggerTest extends TestCase {
    
    private $logger;

    public function setUp(): void {
        parent::setUp();
        $this->logger = new Logger();
    }

    public function test_log_creates_entry() {
        $result = $this->logger->log('info', 'Test log message');
        $this->assertIsInt($result);
        $this->assertGreaterThan(0, $result);
    }

    public function test_info_method() {
        $result = $this->logger->info('Info message');
        $this->assertIsInt($result);
    }

    public function test_warning_method() {
        $result = $this->logger->warning('Warning message');
        $this->assertIsInt($result);
    }

    public function test_error_method() {
        $result = $this->logger->error('Error message');
        $this->assertIsInt($result);
    }

    public function test_success_method() {
        $result = $this->logger->success('Success message');
        $this->assertIsInt($result);
    }

    public function test_get_logs_returns_array() {
        $this->logger->log('info', 'Test log');
        $logs = $this->logger->get_logs();
        $this->assertIsArray($logs);
        $this->assertNotEmpty($logs);
    }

    public function test_clear_logs() {
        $this->logger->log('info', 'Test log');
        $result = $this->logger->clear_logs();
        $this->assertTrue($result !== false);
    }
}