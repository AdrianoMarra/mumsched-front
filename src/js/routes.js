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
          files: ['js/controllers/student/student.js']
        });
      }]
    }
  })

  .state('appSimple.studentDashboard.availableCourses', {
    url: '/available-courses',
    templateUrl: 'views/student/available-courses.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/student/student.js']
        });
      }]
    }
  })

  .state('appSimple.studentDashboard.registerToCourses', {
    url: '/register-courses',
    templateUrl: 'views/student/register-to-courses.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/student/student.js']
        });
      }]
    }
  })

  .state('appSimple.studentDashboard.registerConfirm', {
    url: '/confirmation',//?id/:?section',
    // params: {
    //   id: null,
    //   section_id: null
    // },
    templateUrl: 'views/student/register-confirmation.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/student/student.js']
        });
      }]
    }
  })

    .state('appSimple.studentDashboard.schedule', {
    url: '/register-courses',
    templateUrl: 'views/student/schedule.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/student/student.js']
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
          files: ['js/controllers/admin/admin.js']
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
          files: ['js/controllers/admin/adminStudent.js']
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
          files: ['js/controllers/admin/adminStudent.js']
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
          files: ['js/controllers/admin/adminStudent.js']
        });
      }]
    }
  })

  //------------------------ Entry crud --------------------------
  .state('appSimple.adminDashboard.entries', {
    url: '/entries',
    templateUrl: 'views/admin/entry-crud/list.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminEntry.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.entryNew', {
    url: '/entries/new',
    templateUrl: 'views/admin/entry-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminEntry.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.entryEdit', {
    url: '/entries/edit?id',
    templateUrl: 'views/admin/entry-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminEntry.js']
        });
      }]
    }
  })

  //------------------------ Course crud --------------------------
  .state('appSimple.adminDashboard.courses', {
    url: '/courses',
    templateUrl: 'views/admin/course-crud/list.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminCourse.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.courseNew', {
    url: '/courses/new',
    templateUrl: 'views/admin/course-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminCourse.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.courseEdit', {
    url: '/courses/edit?id',
    templateUrl: 'views/admin/course-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminCourse.js']
        });
      }]
    }
  })

  //------------------------ Faculty crud --------------------------
  .state('appSimple.adminDashboard.faculties', {
    url: '/faculties',
    templateUrl: 'views/admin/faculty-crud/list.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminFaculty.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.facultyNew', {
    url: '/faculties/new',
    templateUrl: 'views/admin/faculty-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminFaculty.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.facultyEdit', {
    url: '/faculties/edit?id',
    templateUrl: 'views/admin/faculty-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminFaculty.js']
        });
      }]
    }
  })

  //------------------------ Block crud --------------------------
  .state('appSimple.adminDashboard.blocks', {
    url: '/blocks',
    templateUrl: 'views/admin/block-crud/list.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminBlock.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.blockNew', {
    url: '/blocks/new',
    templateUrl: 'views/admin/block-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminBlock.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.blockEdit', {
    url: '/blocks/edit?id',
    templateUrl: 'views/admin/block-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminBlock.js']
        });
      }]
    }
  })

  //------------------------ Admin crud --------------------------
  .state('appSimple.adminDashboard.admins', {
    url: '/admins',
    templateUrl: 'views/admin/admin-crud/list.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminAdmin.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.adminNew', {
    url: '/admins/new',
    templateUrl: 'views/admin/admin-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminAdmin.js']
        });
      }]
    }
  })

  .state('appSimple.adminDashboard.adminEdit', {
    url: '/admins/edit?id',
    templateUrl: 'views/admin/admin-crud/new.html',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/admin/adminAdmin.js']
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
          files: ['js/controllers/faculty/faculty.js']
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
          files: ['js/controllers/faculty/faculty.js']
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
          files: ['js/controllers/faculty/faculty.js']
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
          files: ['js/controllers/faculty/faculty.js']
        });
      }]
    }
  })

}]);
