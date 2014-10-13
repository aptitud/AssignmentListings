/**
 * Created by Zem on 2014-10-10.
 */
app.controller("AssignmentController", function($scope, $http){

    $scope.fetchAssignments = function(type){
        $http.get('/scrape',{
            params: {
                type: type
            }
        }).success(function(data){
            if(type == 'ework') {
                $scope.eworkassignments = data.assignments;
            }
            else if(type == 'rapidkonsult'){
                $scope.rapidkonsultassignments = data.assignments;
            }
            else if(type == 'godit'){
                $scope.goditassignments = data.assignments;
            }
            else if(type == 'gabertpartners'){
                $scope.gabertpartnersassignments = data.assignments;
            }
            else if(type == 'keyman'){
                $scope.keymanassignments = data.assignments;
            }
        })
    }

    $scope.init = function(){
        $(".toggle-link").bind('click',toggleDotBox);
        console.log('init');
    }

    function toggleDotBox(){
        var iconPlus = $(this).find('.ui-icon-circle-plus');
        var iconMinus = $(this).find('.ui-icon-circle-minus');
        var toggleContainerId = $(this).attr('toggle');
        var loadtype = $(this).attr('load');
        console.log("sdsd" + toggleContainerId);
        if(iconPlus[0]){
            iconPlus.removeClass('ui-icon-circle-plus');
            iconPlus.addClass('ui-icon-circle-minus');
            $("[id='"+toggleContainerId+"']").show();
            $scope.fetchAssignments(loadtype);
        }else{
            iconMinus.removeClass('ui-icon-circle-minus');
            iconMinus.addClass('ui-icon-circle-plus');
            $("[id='"+toggleContainerId+"']").hide();
        }
    }

    $scope.init();
});