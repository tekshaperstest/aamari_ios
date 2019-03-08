app.controller('searchresult', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {

if (!$cookieStore.get('userinfo')) {
   //$location.path('/login');
   //return false;
   $scope.loggedin = false;
   var uid = '';
}else{
   $scope.loggedin = true;
   var uid = $cookieStore.get('userinfo').uid;

}

/**
 * Funtion: searchbar on ng-keyup from home.html
 * Name: Sajal Goyal
 * Created-on: 13/02/2019 at 12:00pm
 * Get product on searching
 */
$scope.searchbar = function () {
    $scope.datanotfound = false;
    $scope.resultstatus = false;
    $scope.searchresult = '';
    $scope.enableDiv = false;

    if (($scope.search.length >= 1) && ($scope.search.length < 3)) {
        $scope.resultstatus = true;
        return false;
    } else if ($scope.search.length == 0) {

        $scope.resultstatus = false;
        return false;
    }

     console.log($scope.search.length)
     $('#searchloder').addClass('show').removeClass('hide');
    $rootScope.search_val = $scope.search;
    /* var args = $.param({
        'search_key': $scope.search,
        'uid': $cookieStore.get('userinfo').uid,
        'mid': uuid
    }) */
    $http({
        headers: {
            //'token': '40d3dfd36e217abcade403b73789d732',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        url: app_url + '/search/searchapi_result/?search_key=' + $scope.search+'&uid='+uid+'&mid='+uuid+'&page_no='+'1',
        //data: args

    }).then(function (response) {

        res = response;
        // console.log(res.data.data)

        if (res.data.total_record > 0) {
            $scope.total_record = res.data.total_record;
            $scope.searchresult = res.data.data;
            $rootScope.search_result = $scope.searchresult;
            $scope.enableDiv = true;
            //$rootScope.scroll_search();
        } else {
            // alert()
            $scope.resultstatus = false;
            $scope.searchresult = '';
            $scope.datanotfound = true;
        }

    }).finally(function () {
        $('#searchloder').addClass('hide').removeClass('show');
    });



}
});
