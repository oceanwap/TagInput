(function ( $ ) {

$.fn.autoSize = function( options ) {
    var settings = $.extend({
            comfortZone: 30,
            minWidth: this.width(),
            maxWidth: 500,
            minHeight: this.height(),
            maxHeight: 500,
        }, options);
        
    return this.each(function(){
        var input = $(this);
        var testSubject = $($(this).filter('input')?'<div>':'<pre>').css($.extend({
            display:"none",
            fontSize: input.css('fontSize'),
            fontFamily: input.css('fontFamily'),
            fontWeight: input.css('fontWeight'),
            letterSpacing: input.css('letterSpacing'),
            wordBreak:$(this).filter('input')?"normal":"break-word",
            whiteSpace:$(this).filter('input')?"nowrap":"normal",
        },settings));
        $(testSubject).insertAfter(input);
        $(this).bind('keyup keydown blur update', function() {
                testSubject.html($(this).filter('input')?input.val().replace(/\s/g,"&nbsp;"):input.val());
                input.width(testSubject.width() + (testSubject.width()>settings.minWidth?settings.comfortZone:0)+"px")
                .height(testSubject.height() + (testSubject.height()>settings.minHeight?settings.comfortZone:0)+"px");
            });
    });
};


$.fn.tagInput= function(options){
    var settings={class:"tagInput"}
    return this.each(function(){
        var _parent= $(this).parent();
        var _prev= $(this).prev();
        var _next= $(this).next();
        var _tags= [];
        $(this).remove();
               
        var _tagger= $("<div>",{class:"_tagger "+settings.class});
       
        var _tag_visible_div= $("<div>",{class:"_tag_visible_div",type:"text"});
        var _tag_visible_input= $("<input>",{class:"_tag_visible_input",type:"text"});
        var _tag_hidden_input=$("<input>",{class:"_tag_hidden_input",type:"hidden",id:$(this).attr('id'),name:$(this).attr('name')});
        
        $(_tagger).append(_tag_hidden_input);
        $(_tagger).prepend($(_tag_visible_div).append(_tag_visible_input));
        $(_tag_visible_input).bind('keyup keydown blur update',function(){
            var _chCode = event.keyCode;
            
            var taggable= !(48<=_chCode&&_chCode<=57||65<=_chCode&&_chCode<=90||97<=_chCode&&_chCode<=122||_chCode==189||_chCode==37||_chCode==39||_chCode==8||_chCode==46||_chCode==32||_chCode==229||_chCode==16)||_chCode==13;
            console.log(_chCode);
            if (!taggable) {
                if(event.shiftKey&&event.type=="keydown"&&_chCode==8||event.type=="keydown"&&_chCode==8){
                    if ($(_tag_visible_input).val()!="") {
                        if(event.shiftKey&&event.type=="keydown"&&_chCode==8) $(_tag_visible_input).val("");
                    }else{
                        for(key in _tags){
                            if(_tags[key]==$(_tag_visible_input).prev().find("._tag_node_text").html())
                            _tags.splice(key,1);
                        }
                            _tag_hidden_input.val(_tags.join(","));
                        $(_tag_visible_input).prev().remove();
                    }
                }
                return true; 
            }else{
                //console.log(_chCode);
                event.preventDefault();
                event.stopPropagation();
                var _pos= $(this).val().length;
                var pos= $(this).val();
                var _tag_value= $(this).val().substring(0,_pos);
                var _tag_node_text= $("<span>",{class:"_tag_node_text"}).html(_tag_value);
                var _tag_node_remove= $("<span>",{class:"_tag_node_remove"}).html("&#x274C;").click(function(){
                    for(key in _tags){ if(_tags[key]==$(this).prev().html()) _tags.splice(key,1); }
                    _tag_hidden_input.val(_tags.join(","));
                    $(this).parent().remove();
                    });
                var _tag_node= $("<span>",{class:"_tag_node"}).append(_tag_node_text).append(_tag_node_remove);    
                if (taggable>0&&(_tag_value!=""&&_tag_value!=null&&_tag_value!=undefined)&&$(this).val().search(/[a-zA-Z0-9\-_]/g)>=0) {
                    for(key in _tags){ if(_tags[key]==_tag_value) return false; }
                    _tags.push(_tag_value);
                    _tag_hidden_input.val(_tags.join(","));
                    $(this).val(null);
                    $(_tag_node).insertBefore(_tag_visible_input);
                    console.log(_tags);
                }
                
                return false;
            }
        });
        
        if (_prev!=_prev) 
             $(_tagger).insertAfter(_prev);
        else if(_next!=_next)
            $(_tagger).insertBefore(_next);
        else
            $(_parent).append(_tagger);
        $(_tag_visible_input).autoSize();
        $(_tagger).click(function(){$(_tag_visible_input).focus();})
        
    });
}

}( jQuery ));
