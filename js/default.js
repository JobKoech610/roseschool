var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


function decorate() {
  $(':button:enabled,:submit:enabled').addClass('ui-state-default ui-corner-all');
  $(':button:disabled,:submit:disabled').addClass('ui-state-disabled ui-corner-all');
  
  $('#UserBlock li a').addClass('ui-state-default ui-corner-all');  
  
  $('#actions-buttonset').addClass('ui-widget-content ui-helper-clearfix');
  $('.actions-buttonset').addClass('ui-widget-content ui-helper-clearfix');
  
  // Hover states on buttons
  $('.ui-state-default').hover(
    function() { $(this).addClass('ui-state-hover'); }, 
    function() { $(this).removeClass('ui-state-hover'); }
  );
  if (jQuery.browser.msie && jQuery.browser.version=='7.0') {
    $('label.required').append('<span class="required">*</span>');
  }
}

$(function() {
    
  if ($('.newProfileItem form .errors').length == 0) {
    $('.newProfileItem').hide();
    $('.actions-buttonset').show().find('input:button').click(function() {
      $(this).parent().hide();
      $('.form').show();
      return false;
    });
  }
  
  $('#cancel').bind('click',function(){
    location.href = location.href;
  });

  var $dash = $('#dashboard');
  if ($dash.length > 0) {
    $dash.find('li.box').addClass('ui-dialog ui-widget ui-widget-content ui-corner-all');
    $dash.find('h3').addClass('ui-dialog-titlebar ui-widget-header ui-corner-top ui-helper-clearfix');
    $dash.find('li.box .content').addClass('ui-dialog-content ui-widget-content');
    $dash.find('li.box .actions').addClass('ui-dialog-buttonpane ui-widget-content ui-corner-bottom ui-helper-clearfix');
    $dash.find('li.box a').addClass('ui-state-default ui-corner-all');
    $dash.find('li.box span.disabled').addClass('ui-state-disabled ui-corner-all');
    $dash.find('li.box ul.hints').addClass('ui-state-error ui-corner-all ');
    $dash.find('td.cmds a.edit').addClass('ui-state-default ui-corner-all ui-helper-clearfix').html('<span title="Edit" class="ui-icon ui-icon-pencil"></span>');
    $dash.find('td.cmds a.delete').addClass('ui-state-default ui-corner-all ui-helper-clearfix').html('<span title="Delete" class="ui-icon ui-icon-closethick"></span>');
  }
    
  $('#actions-buttonset a').addClass('ui-state-default ui-corner-all');
  $('.actions-buttonset a').addClass('ui-state-default ui-corner-all');
  
  $('#ft').ajaxComplete(decorate);
  
  decorate();
  
  if ($('#flash p').text() != '') {
    $('#flashWrapper').show('drop', {'direction':'up'}, 200, function() {
      setTimeout(function() {
        $('#flashWrapper').hide('drop', {'direction':'up'}, 500);
      }, 2000);
    });
  }  
});

// RenomoJS
if (typeof String.safeAppend == 'undefined') {
  String.prototype.safeAppend = function(str) {
    if (str.length > this.length)
      return this + str;

    // IE does not support negative substr indexes
    var chunk = this.substr(this.length - str.length);

    return (str == chunk) ? this : this + str;
  }
}

$(function() {
  var wh = $('.withHelp');
  if (wh.length > 0) {

    wh.after($("<img src='../img/question.png' title='Click to view related help' class='helpIco'/>"))

    $('img.helpIco').click(function() {
      var input = $(this).siblings(':input');
      var item = input.parents('form').attr('id').replace(/(New$)|(Edit$)/,'') + "." + input.attr('id');
      var title = $(this).next('.help-text').find('h3');
      title.hide();
      $("#helpDialog").dialog('option', 'title', title.html());
      $("#helpDialog").html($(this).next('.help-text').html());
      $("#helpDialog").dialog('open');
    });
    
    $('body').append($("<div id='helpDialog'/>"));
    $("#helpDialog").dialog({
                        bgiframe: true,
                        resizable: false,
                        width: 600,
                        modal: true,
                        autoOpen: false,
                        buttons: {'Close': function() {$(this).dialog('close');}}
                      });
  }
  
});

/* RenomoZF.js */
$(function() {
  var fi;
  (fi = $('form :input:visible').not(".hasDatepicker")) && fi.length && fi[0].focus();
});

$('#main .confirm').live('click',function() {
  var rc = confirm("Are you sure you want to " + this.title + "? This operation cannot be undone");
  if (!rc) {
    return false;
  }
});




}
