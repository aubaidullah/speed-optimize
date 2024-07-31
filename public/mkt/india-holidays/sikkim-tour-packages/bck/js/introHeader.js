function avia_header_size()
    {
        var win	            = $(window),
            header			= $(".header");
        
        
        var logo            = $('.logo a, .logo img'),
            elements        = $('.navi'),
            el_height       = $(elements).filter(':first').height(),
            isMobile        = (($(window).width()>805)?0:1),
            scroll_top		= $('#scroll-top-link'),
            shrinking		= true,
            set_height      = function()
            {	
                var st = win.scrollTop(), newH = 0, newHH = 0, newWW = 805;
				el_height = 127;
				
				if(isMobile) {
					elements.removeAttr("style")
                	logo.removeAttr("style")
					header.removeAttr("style")
					
					return false;
				}
				
				var min_logo_height = 80,
				
					menu_height = 0,
					min_menu_height = -15; 
				
				if(shrinking && !isMobile)
                {
					
				
	                if((el_height - st) > min_logo_height)
	                {
						
	                    newH = el_height - st;
	                    header.removeClass('header-scrolled');
						newHH = (menu_height - (((st-2)>0)?(st-2):0));
						
	                }
	                else
	                {
						
	                    newH = min_logo_height;
	                    header.addClass('header-scrolled');
						newHH = min_menu_height;
						newWW = 805
	                }
					
					
					//console.log ( st+'-'+newH+'-'+min_logo_height );
					//console.log((st-2));
					
	                
	                //elements.css({'height': newH + 'px', 'lineHeight': newH + 'px'});
					elements.css({'marginTop': newHH + 'px','width': newWW + 'px'});
                	logo.css({'maxHeight': newH + 'px'});
					header.css({'height': newH + 'px', 'lineHeight': newH + 'px'});
                }
                
              

               
            }

            
            
            if(!shrinking) return;
            
			win.on( 'debouncedresize',  function(){ el_height = $(elements).attr('style',"").filter(':first').height(); set_height(); } );
            win.on( 'scroll',  function(){ window.requestAnimationFrame( set_height )} );
            set_height();
    }

$(document).ready(function() {
    avia_header_size();
	
	
	$(window).resize(avia_header_size);
});


