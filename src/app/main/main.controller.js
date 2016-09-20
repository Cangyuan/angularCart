(function() {
  'use strict';

  angular
    .module('angularTest')
    .controller('MainController', ['$scope','$timeout','webDevTec','toastr',MainController]);

  /** @ngInject */
  function MainController($scope,$timeout, webDevTec, toastr) {
    var vm = this;
    $scope.list=[{
      id:111,
      name:'imac',
      num:1,
      price:10000,
      
    },{
      id:222,
      name:'air',
      num:1,
      price:8000,
      
    },{
      id:333,
      name:'iphone',
      num:1,
      price:5000,
      
    }
    ,{
      id:444,
      name:'mini',
      num:1,
      price:3000,
      
    }];
    $scope.tobalPrice=function(){
      var total=0;
      angular.forEach($scope.list,function(item){
        total+=item.num * item.price;
      });
      return total;
    }
    $scope.totalNum=function(){
      var sum=0;
      angular.forEach($scope.list,function(item){
        sum+=parseInt(item.num);
      });
      return sum;
    };
    //$scope.index=-1;
    var findIndex=function(id){
     var index=-1;
      angular.forEach($scope.list,function(item,key){
        if (item.id===id) {
          index=key;
          return;
        } 
      });
      return index;
    };
    $scope.add=function(id){
      var index= findIndex(id);
      //alert(index)
        if (index!==-1) {
          $scope.list[index].num++
        }
    }
    $scope.less=function(id){
      var index= findIndex(id);
        if (index!==-1) {
          var item=$scope.list[index];
          if (item.num>1) {
            item.num--
          } else {
            var returnWarn=confirm('是否从购物车内删除该产品？');
            if (returnWarn) {
              $scope.removeClick(id);
            }
          }
        }
    }
    $scope.removeClick=function(id){
      //$scope.index=id;
      //alert($scope.index)
      var index= findIndex(id);
        if (index!==-1) {
          $scope.list.splice(index,1)
        }
    }
    $scope.$watch('list',function(newValue,oldValue){
      angular.forEach(newValue,function(item,key){
        if (item.num<1) {
          var returnWarn=confirm('是否从购物车内删除该产品？');
            if (returnWarn) {
              $scope.removeClick(item.id);
            }else{
              item.num=oldValue.num;
            }
            return;
        }
      })
    },true)
    console.log(vm.list);

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1474247054160;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
