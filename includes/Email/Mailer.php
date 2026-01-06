<?php
/**
 * Email Mailer.
 */

namespace PluginStarter\Email;

class Mailer {
    
    /**
     * Send feedback email.
     *
     * @param string $name Sender name.
     * @param string $email Sender email.
     * @param string $subject Email subject.
     * @param string $message Email message.
     * @return bool
     */
    public function send_feedback($name, $email, $subject, $message) {
        $to = get_option('admin_email');
        $subject = '[Plugin Starter Feedback] ' . $subject;
        
        $body = $this->get_feedback_template($name, $email, $message);
        
        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_bloginfo('name') . ' <' . get_option('admin_email') . '>',
            'Reply-To: ' . $name . ' <' . $email . '>',
        ];

        return wp_mail($to, $subject, $body, $headers);
    }

    /**
     * Get feedback email template.
     *
     * @param string $name Sender name.
     * @param string $email Sender email.
     * @param string $message Email message.
     * @return string
     */
    private function get_feedback_template($name, $email, $message) {
        ob_start();
        include PLUGIN_STARTER_PATH . 'templates/email/feedback-notification.php';
        return ob_get_clean();
    }

    /**
     * Send custom email.
     *
     * @param string $to Recipient email.
     * @param string $subject Email subject.
     * @param string $message Email message.
     * @param array $headers Email headers.
     * @return bool
     */
    public function send($to, $subject, $message, $headers = []) {
        $default_headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_bloginfo('name') . ' <' . get_option('admin_email') . '>',
        ];

        $headers = array_merge($default_headers, $headers);

        return wp_mail($to, $subject, $message, $headers);
    }
}