angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/home');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Flags',
          files: ['node_modules/flag-icon-css/css/flag-icon.min.css']
        },{
          serie: true,
          name: 'Font Awesome',
          files: ['node_modules/font-awesome/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'node_modules/chart.js/dist/Chart.min.js',
            'node_modules/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    }
  })
  .state('app.main', {
    url: '/template',
    templateUrl: 'views/main.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'node_modules/chart.js/dist/Chart.min.js',
              'node_modules/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/main.js']
        });
      }]
    }
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['node_modules/font-awesome/css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
        }]);
      }],
    }
  })

  //-----------------------------------------------------------------
  // MUMSched home page
  //=================================================================
  .state('appSimple.home', {
    url: '/home',
    templateUrl: 'views/home.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/home.js']
        });
      }]
    }
  })

  //-----------------------------------------------------------------
  // MUMSched login pages
  //=================================================================
  .state('appSimple.loginStudent', {
    url: '/student/login',
    templateUrl: 'views/student/login.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/student/studentLogin.js']
        });
      }]
    }
  })

  .state('appSimple.loginFaculty', {
    url: '/faculty/login',
    templateUrl: 'views/faculty/login.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/faculty/facultyLogin.js']
        });
      }]
    }
  })

  .state('appSimple.admin', {
    url: '/admin/login',
    templateUrl: 'views/admin/login.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminLogin.js']
        });
      }]
    }
  })


  //-----------------------------------------------------------------
  // MUMSched student dashboard pages
  //=================================================================
  .state('appSimple.studentDashboard', {
    url: '/student/dashboard',
    templateUrl: 'views/student/dashboard.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/student/student.js', 'js/controllers/student/studentLogin.js']
        });
      }]
    }
  })

  //-----------------------------------------------------------------
  // MUMSched admin dashboard pages
  //=================================================================
  .state('appSimple.adminDashboard', {
    url: '/admin/dashboard',
    templateUrl: 'views/admin/dashboard.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/admin.js', 'js/controllers/admin/adminLogin.js']
        });
      }]
    }
  })
  
  //------------------------ Student crud --------------------------
  .state('appSimple.adminDashboard.students', {
    url: '/students',
    templateUrl: 'views/admin/student-crud/list.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminStudentList.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.studentNew', {
    url: '/students/new',
    templateUrl: 'views/admin/student-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminStudentNew.js']
        });
      }]
    }
  })

    .state('appSimple.adminDashboard.studentEdit', {
    url: '/students/edit?id',
    templateUrl: 'views/admin/student-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminStudentNew.js']
        });
      }]
    }
  })

  //-----------------------------------------------------------------
  // MUMSched faculty dashboard pages
  //=================================================================
  .state('appSimple.facultyDashboard', {
    url: '/faculty/dashboard',
    templateUrl: 'views/faculty/dashboard.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/faculty/faculty.js', 'js/controllers/faculty/facultyLogin.js']
        });
      }]
    }
  })

  .state('appSimple.facultyDashboard.blocksPreference', {
    url: '/block-preference',
    templateUrl: 'views/faculty/teste.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/faculty/faculty.js', 'js/controllers/faculty/facultyLogin.js']
        });
      }]
    }
  })

  .state('appSimple.facultyDashboard.coursesPreference', {
    url: '/course-preference',
    templateUrl: 'views/faculty/teste02.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/faculty/faculty.js', 'js/controllers/faculty/facultyLogin.js']
        });
      }]
    }
  })

  .state('appSimple.facultyDashboard.schedule', {
    url: '/schedule',
    templateUrl: 'views/faculty/teste03.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/faculty/faculty.js', 'js/controllers/faculty/facultyLogin.js']
        });
      }]
    }
  })

}]);
