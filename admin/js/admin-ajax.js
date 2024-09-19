jQuery(document).ready(function($) {   
    $('body').on('click', '.button-reset', function(reset){
        // console.log('clicked');
        reset.preventDefault();
        let text = "Are You Sure?\nAre you sure you want to proceed with the changes.";
        if (confirm(text) == true) {
            let name= $(this).data('name');
            if(name) {
                var dataJSON = {
                    action: 'plugin_starter_reset_settings',
                    _admin_nonce: plugin_starter_ajax_obj._admin_nonce,
                    name: name,
                };
                $.ajax({
                    cache: false,
                    type: "POST",
                    url: plugin_starter_ajax_obj.ajax_url,
                    data: dataJSON,
                    // beforeSend: function() {
                    //     $('.some-class').addClass('loading');
                    // },
                    success: function(response) {
                        console.log(response);
                        if (response.success) {}
                        // on success
                        // code...
                    },
                    error: function(xhr, status, error) {
                        console.log('Status: ' + xhr.status);
                        console.log('Error: ' + xhr.responseText);
                    },
                    complete: function() {}
                });
            }
        }        
    });
});
