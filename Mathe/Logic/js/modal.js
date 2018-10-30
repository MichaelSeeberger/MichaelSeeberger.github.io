function defaultModal() {
    return $("#defaultModal");
}

function ModalViewController(aModelID) {
    this.modalPanel = $("#"+aModelID);
    this.defaultPrimaryButtonText = "OK";
}

ModalViewController.prototype.runModal = function(aTitle, aBodyText, thePrimaryButtonText, theSuccessCallback) {
    this.modalPanel.find(".modal-title").html(aTitle);
    if (typeof aBodyText != 'undefined')
        this.modalPanel.find(".modal-body").html(aBodyText);
    this.modalPanel.modal({
        keyboard: true
    });

    if (typeof thePrimaryButtonText == 'undefined' || thePrimaryButtonText == null) {
        thePrimaryButtonText = this.defaultPrimaryButtonText;
    }

    var thePrimaryButton = this.modalPanel.find(".modal-footer .btn-primary");
    thePrimaryButton.text(thePrimaryButtonText);
    thePrimaryButton.click(function() {
        if (typeof theSuccessCallback == 'function' ) {
            theSuccessCallback();
        }

        $(this).closest(".modal").modal('hide');
        $(this).unbind('click');
    });
}

ModalViewController.prototype.dismissDefaultModal = function() {
    defaultModal().modal('hide');
}
