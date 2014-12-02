(function () {

    var plugins = this.RedactorPlugins = this.RedactorPlugins || {};

    /**
     * Redimage plugin. Little hack there - we're attaching properties to the
     * function itself rather than using an object literal, so that a consumer
     * of this plugins can modify/override functions as they like.
     *
     * @return {[type]} [description]
     */
    plugins.redimage = function () {
        return plugins.redimage;
    };

    /**
     * The button HTML to use.
     * @return {[type]} [description]
     */
    plugins.redimage.buttonHtml = function () {
        return '<i class="fa fa-photo"></i>';
    };

    /**
     * Returns the template string for the modal popup.
     *
     * @return {String}
     */
    plugins.redimage.getTemplate = function () {
        return String() +
            '<section id="redactor-modal-redimage-insert">' +
                '<label>Link to Image</label>' +
                '<input type="text" id="redactor-redimage-link" />' +
                '<label>Image Title</label>' +
                '<input type="text" id="redactor-redimage-title" />' +
            '</section>';
    };

    /**
     * Initialises the plugin, adding its image to the Redactor toolbar.
     */
    plugins.redimage.init = function () {
        var $button = this.button.add('redimage-btn', 'Link Image');
        $button.html(plugins.redimage.buttonHtml());

        this.button.addCallback($button, this.redimage.show);
    };

    /**
     * Displays the modal popup.
     */
    plugins.redimage.show = function () {
        // Create a new modal template and load the popup
        this.modal.addTemplate('redimage', this.redimage.getTemplate());
        this.modal.load('redimage', 'Insert Image', 500);

        // Add a cancel button.
        this.modal.createCancelButton();

        // Add a button to finish and insert the image.
        var button = this.modal.createActionButton(this.lang.get('insert'));
        button.on('click', plugins.redimage.insert);

        // Show the popup.
        this.selection.save();
        this.modal.show();
    };

    /**
     * Inserts an image into the Redactor document.
     */
    plugins.redimage.insert = function () {
        var link = escape($('#redactor-redimage-link').val());
        var title = escape($('#redactor-redimage-title').val());

        this.insert.html('<img src="' + link + '" alt="' + title + '">');
        this.modal.close();
    };

    /**
     * Used by `escape` to convert characters to HTML entities. From lodash.
     *
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeHtmlChar(match) {
      return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    }
    /**
     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
     * corresponding HTML entities. From lodash.
     *
     * @param {string} string The string to escape.
     * @returns {string} Returns the escaped string.
     */
    function escape (str) {
        return str.replace(/[&<>"'"]/g, escapeHtmlChar);
    }

    // Expose for module loading
    if (typeof define === "function" && define.amd) {
        define(plugins.redimage);
    } else if (typeof module === "object" && module.exports) {
        module.exports = plugins.redimage;
    }

}).call(window);
