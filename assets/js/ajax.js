jQuery(document).ready(function($) {    
    $(document).on('click', '#plugin_starter_wooinstall', function(e) {
        // console.log('clicked');
        e.preventDefault();
        var current = $(this);
        var plugin_slug = current.attr("data-plugin-slug");
        current.addClass('updating-message').text('Installing...');
        var data = {
            action: 'plugin_starter_ajax_install_plugin',
            _ajax_nonce: plugin_starter_ajax_obj.install_plugin_wpnonce,
            slug: plugin_slug,
        };

        $.post(plugin_starter_ajax_obj.ajax_url, data, function(response) {
            current.removeClass('updating-message');
            current.addClass('updated-message').text('Installing...');
            current.attr("href", response.data.activateUrl);
        })
        .fail(function() {
            current.removeClass('updating-message').text('Install Failed');
        })
        .always(function() {
            current.removeClass('install-now updated-message').addClass('activate-now button-primary').text('Activating...');
            current.unbind(e);
            current[0].click();
        });
    }); 
});