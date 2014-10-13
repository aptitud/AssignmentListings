/**
 * Created by Zem on 2014-10-10.
 */
app.controller("AssignmentController", function($scope, $http, ScrapeService, Loader){

    $scope.addFilter = function(type){
        if(!$scope.filterToAdd || $scope.filterToAdd.length == 0){
            return;
        }
        var filters = getFilterList(type);
        if(filters.indexOf($scope.filterToAdd) == -1){
            filters.push($scope.filterToAdd);
            var assignments = getAssignments(type);
            updateAssignments(type, filter(filters, assignments));
        }
        $scope.filterToAdd = '';
    }

    $scope.removeFilter = function(filterToRemove, type){
        var filters = getFilterList(type);
        var result = [];
        for(var i=0; i<filters.length; i++){
            var f = filters[i];
            if(filterToRemove != f){
                result.push(f);
            }
        }
        updateFilterList(type,result);
        var assignments = getOrginalAssignments(type);
        updateAssignments(type, filter(getFilterList(type), assignments))
    }

    $scope.fetchAssignments = function(type){
        Loader.start();
        ScrapeService.scrape(type).success(function(data){
            var filters = getFilterList(type);
            updateAssignments(type, filter(filters ,data.assignments));
            updateOrginal(type, data.assignments);
            Loader.end();
        })
    }

    $scope.init = function(){
        $scope.rapidkonsultFilters = ['Stockholm'];
        $scope.eworkFilters = ['Stockholm'];
        $scope.goditFilters = [];
        $scope.gabertpartnersFilters = [];
        $scope.keymanFilters = [];
        $(".toggle-link").bind('click',toggleDotBox);
    }

    function toggleDotBox(){
        var iconPlus = $(this).find('.ui-icon-circle-plus');
        var iconMinus = $(this).find('.ui-icon-circle-minus');
        var toggleContainerId = $(this).attr('toggle');
        var loadtype = $(this).attr('load');
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

    function filter(filterList, listToFilter){
        if(filterList.length == 0){
            return listToFilter;
        }
        var result = [];
        angular.forEach(listToFilter, function(item) {
            var itemToSearch = JSON.stringify(item).toLowerCase();
            if(containsAll(itemToSearch, filterList)){
                this.push(item);
            }
        }, result);
        return result;
    }

    function containsAll(stringToSearch, filters){
        for(var i=0; i< filters.length; i++){
            var q = filters[i].toLowerCase()
            if(stringToSearch.indexOf(q) == -1){
                return false;
            }
        }
        return true;
    }

    function updateOrginal(type, assignments){
        if(type == 'ework') $scope.orgeworkassignments = assignments;
        else if(type == 'rapidkonsult') $scope.orgrapidkonsultassignments = assignments;
        else if(type == 'godit') $scope.orggoditassignments = assignments;
        else if(type == 'gabertpartners') $scope.orggabertpartnersassignments = assignments;
        else if(type == 'keyman') $scope.orgkeymanassignments = assignments;
    }

    function updateAssignments(type, assignments){
        if(type == 'ework') $scope.eworkassignments = assignments;
        else if(type == 'rapidkonsult') $scope.rapidkonsultassignments = assignments;
        else if(type == 'godit') $scope.goditassignments = assignments;
        else if(type == 'gabertpartners') $scope.gabertpartnersassignments = assignments;
        else if(type == 'keyman') $scope.keymanassignments = assignments;
    }

    function updateFilterList(type, filterList){
        if(type == 'ework') $scope.eworkFilters = filterList;
        else if(type == 'rapidkonsult') $scope.rapidkonsultFilters = filterList;
        else if(type == 'godit') $scope.goditFilters = filterList;
        else if(type == 'gabertpartners') $scope.gabertpartnersFilters = filterList;
        else if(type == 'keyman') $scope.keymanFilters = filterList;
    }

    function getAssignments(type){
        if(type == 'ework') return $scope.eworkassignments;
        else if(type == 'rapidkonsult')return $scope.rapidkonsultassignments;
        else if(type == 'godit') return $scope.goditassignments;
        else if(type == 'gabertpartners') return $scope.gabertpartnersassignments;
        else if(type == 'keyman') return $scope.keymanassignments;
    }

    function getOrginalAssignments(type){
        if(type == 'ework') return $scope.orgeworkassignments;
        else if(type == 'rapidkonsult') return $scope.orgrapidkonsultassignments;
        else if(type == 'godit') return $scope.orggoditassignments;
        else if(type == 'gabertpartners') return $scope.orggabertpartnersassignments;
        else if(type == 'keyman') return $scope.orgkeymanassignments;
    }

    function getFilterList(type){
        if(type == 'ework') return $scope.eworkFilters;
        else if(type == 'rapidkonsult') return $scope.rapidkonsultFilters;
        else if(type == 'godit') return $scope.goditFilters;
        else if(type == 'gabertpartners') return $scope.gabertpartnersFilters;
        else if(type == 'keyman') return $scope.keymanFilters;
    }

    $scope.init();
});