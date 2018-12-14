$(document).ready(function(){
	$('a[href^="http://"], a[href^="https://"]').attr('target','_blank');
	recursive();
	$("#preloader").hide();
	$(".toOpac").removeClass('opac');
});
function h3() {
    $("h3.title-info").click(function () {
        $(this).toggleClass('title-info-active', 2000);
    });
    $(".accordion-info .title-info").click(function() {
        $(this).hasClass("ui-state-active") ? ($(this).removeClass("ui-state-active"), $(this).next().slideUp()) : ($(this).addClass("ui-state-active"), $(this).next().slideDown())
    });
}
function recursive(){
		tamingselect();
		$('.row1 .dropcontainer_demo2').detach().appendTo('.row1');
		$('#type-map').click(function(){
			$('#type-list').removeClass('active');
			$('#type-info').removeClass('active');
			$(this).addClass('active');
			$('#show-list').addClass('hidden');
			$('#show-info').addClass('hidden');
			$('#map').removeClass('hidden');
		});
		$('#type-list').click(function(){
			$('#type-map').removeClass('active');
			$('#type-info').removeClass('active');
			$(this).addClass('active');
			$('#map').addClass('hidden');
			$('#show-info').addClass('hidden');
			$('#show-list').removeClass('hidden');
		});
		$('#type-info').click(function(){
			$('#type-map').removeClass('active');
			$('#type-list').removeClass('active');
			$(this).addClass('active');
			$('#map').addClass('hidden');
			$('#show-list').addClass('hidden');
			$('#show-info').removeClass('hidden');
		});
		$(".disabled").click(function(){
			return false;
		});
		$(".mini-image").hover(function(){
			$(this).next().toggle();
		});
		$('li[id^="branch-"]').click(function(){
			$("#preloader").show();
			$(".toOpac").addClass('opac');
			var id = $(this).attr('id').substr(7);
			$.ajax({  
		      type: "POST", 
		      url: "contact.php",
		      data: "action=points&id="+id,
		      success: function(html){
		      	//console.log(html);
		      	$("#main-page").html(html);
		      	h3();
		        recursive();
		      }
		    });
		});
		$('a[id^="minimap-"]').click(function(){
			
			var id = $(this).attr('id').substr(8);
			$.ajax({  
		      type: "POST", 
		      url: "contact.php",
		      data: "action=minimap&id="+id, 
		      success: function(html){ 
		        $("#minimap-full-"+id).html(html);
		        $("#minimap-full-"+id).slideToggle();
		        $('div[id^="minimap-full"]').not($("#minimap-full-"+id)).hide();
		        $('button[id^="print-button-"]').click(function(){
					$("#minimap-full-"+id).printThis({printContainer: true});
				});
				$('a[id^="close-minimap-"]').click(function(){
					var id = $(this).attr('id').substr(14);
					$("#minimap-full-"+id).slideUp();
					$("#minimap-full-"+id).empty();
					$("#"+id).remove();
				});
			  }
			});
		});
		$('span[id^="graphic-"]').click(function(){
			$(this).parent().next().slideToggle();
		});
		$("#search").focus(function(){
	      $("#resSearch").fadeIn();
	    });
	    $("#search").blur(function(){
	      $("#resSearch").fadeOut();
	    });
		$("#search").keyup(function(){
		     var search = $("#search").val();
		     $.ajax({
		       type: "POST",
		       url: "ajax/search.php",
		       data: {"search": search},
		       cache: false,                                 
		       success: function(response){
		          $("#resSearch").html(response);
		          $('a[id^="onepoint-"]').click(function(){
		          	$("#preloader").show();
					$(".toOpac").addClass('opac');
		          	var id = $(this).attr('id').substr(9);
		          	$.ajax({  
				      type: "POST", 
				      url: "contact.php",
				      data: "action=onepoint&id="+id, 
				      success: function(html){
				        $("#main-page").html(html);
                          h3();
				        recursive();
				      }
		          	});
		       	   });
		         }
		     });
		     return false;
		   });
}
