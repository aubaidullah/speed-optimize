//tort1

SendQuery=()=>{
    //e.preventDefault();
    console.log("submit")
    var gest=document.getElementsByName("guestName")[0].value
    var email=document.getElementsByName("email")[0].value
    var mobile=document.getElementsByName("mobile")[0].value
    var city = document.getElementById("Starting_City")
    city = city.value;
    var adult = document.getElementById("adult_sub")
    var child = document.getElementById("child_sub")

    adult = adult.value
    child = child.value

    var date = document.getElementsByName("startDateStr")[0].value
    var cquery = document.getElementsByName("customerquery")[0].value
    var countrycodemo = "IN"
    var bookingType = 2
    var status = 1
    var packageInfo = 1
    var pageFrom = "PK"
    var callme = "on"
    var newsletter = "on"

    
    if(window.location.host=="www.kiomoi.com")
    {
        var requrl = "https://"+window.location.host+"/submitquery.htm"
    }
    else{
        var requrl = "http://"+window.location.host+"/submitquery.htm"
    }

    //var requrl = "http://kiomoi:8080/submitquery.htm"

    //var requrl = "https://kiomoi.com/submitquery.htm"

    if(true)
    {
      $.ajax({
        type:'POST',
        url:requrl,
        data:{
            ajaxRequest:true,
            adultCount:adult,
            childCount:child,
            bookingType:bookingType,
            callme:callme,
            cityName:city,
            countrycodemo:countrycodemo,
            customerquery:cquery,
            email:email,
            guestName:gest,
            mobile:mobile,
            newsletter:newsletter,
            packageInfo:536,
            pageFrom:pageFrom,
            startDateStr:date.replace('-','/').replace('-','/'),
            status:status
        },
        crossDomain:true,
        /*dataType : 'jsonp',*/
        //dataType:'jsonp',
        beforeSend:function(){
            //$("#lform_").val("please wait...")
            $(".tort1").html("please wait...")
        },

        success:function(e){
            gtag('event', 'conversion', {'send_to': 'AW-852061552/PkRJCKD_yJMBEPDapZYD'}); 
            function gtag_report_conversion(url)
            {
                var callback = function () {
                if (typeof(url) != 'undefined')
                    {
                    window.location = url; 
                    } 
            }; 
            gtag('event', 'conversion', { 'send_to': 'AW-852061552/PkRJCKD_yJMBEPDapZYD', 'event_callback': callback });
                return false; 
            }
            var json = $.parseJSON(e)
            if($(window).width()<767){
                $('.modal-dialog').css({'top':'20%'})
            }
            if(json.duplicate){
                //$(".travel_detail").css("display","none");
                $("._fm").css("display","none");
                //$(".travel_query").css("padding-top","10px")
                $(".ajaxResult").css("display","initial")
                $(".hline").text("Thankyou!")
                $(".ajaxResult").html(
                    "<div style='text-align:center;padding-bottom:15px'>\
                        <img src='/resources/img/images/logo2.png' />    \
                        <p style='padding-top:10px;text-align:center;font-size:15px;'>We appreciate your continued interest for the trip. We have already received your query with reference <b>"+json.billingId+"</b> and will be reverting within 24 hours</p>\
                        <p style='text-align:center;font-size:10px;' >We assure you within 24 hours response. Feel free to call us on <span style='color:#f16625'>+919650687940</span> or drop a mail on <a href='mailto:info@kiomoi.com?Subject=Query regarding reference number "+json.billingId +"' target='_top'><span style='color:#f16625'>info@kiomoi.com</span></a> for a sooner response</p>\
                    </div>"
                )
                $("#trip_query_form").css("top","20%")
                }
            else{
                //$(".travel_detail").css("display","none");
                $("._fm").css("display","none");
                $(".ajaxResult").css("display","initial");
                $(".hline").text("Thankyou!")
                $(".ajaxResult").html(
                    "<div style='text-align:center;padding-bottom:15px'>\
                        <img src='/resources/img/images/logo2.png' />    \
                        <p style='padding-top:10px;text-align:center;font-size:15px;'>Thanks for query with Kiomoi, your reference number is <b>"+json.billingId+"</b></p>\
                        <p style='text-align:center;font-size:10px;' >We assure you within 24 hours response. Feel free to call us on <span style='color:#f16625'>+919650687940</span> or drop a mail on <a href='mailto:info@kiomoi.com?Subject=Query regarding reference number "+json.billingId +"' target='_top'><span style='color:#f16625'>info@kiomoi.com</span></a> for a sooner response</p>\
                        </div>"
                    )
                $("#trip_query_form").css("top","20%")
            }
        },
        error:function(ee){
            $(".tort1").html("please try again")
        }
        })
    }
    

}

$(document).ready(()=>{
    // $(".tort1").on('click',()=>{
    //     SendQuery();
    // })
    $("#lform").submit((e)=>{
        e.preventDefault();
        SendQuery()
    })

})