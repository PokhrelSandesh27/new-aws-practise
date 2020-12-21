import React from 'react'
import {
    Logout,
    Teacher,
    Eclass,
    User,
    TimeTable,
    Elearning,
    Message,
    TCA,
    ELibrary,
    Students,
    Grade,
    Payment,
    Attendance, Alumni, Issue
} from './svg'
import {Subject} from "@material-ui/icons";

const permissions = {
    'TEACHER': {

        'timetable': {
            'url': '/timetable/teacher',
            'name': 'Online-Class',
            'icon': <TimeTable/>,

        },
        'Attendance': {
            'url': '/attendance',
            'name': 'Attendance',
            'icon': <Attendance/>,

        },
        'assignment': {
            'url': '/assignment',
            'name': 'E-Learning',
            'icon': <Elearning/>,

        },
        'marksheets': {
            'url': '/marksheets/Teacher',

            'name': 'Results',
            'icon': <Grade/>,

        },
        'question': {
            'url': '/exam/term/',
            'name': 'Online Exam',
            'icon': <TimeTable/>,

        },
        'library': {
            'url': '/library/studentBook',
            'name': 'E-Library',
            'icon': <ELibrary/>,
        },

        'messaging': {
            'url': '/messaging',
            'name': 'Messaging',
            'icon': <Message/>,
        },

    },
    'STUDENT': {


        'timetable': {
            'url': '/timetable/student/classroom',
            'name': 'Online-Class',
            'icon': <TimeTable/>,

        },
        'Attendance': {
            'url': '/attendance/view/chart',
            'name': 'Attendance',
            'icon': <Attendance/>,

        },
        'assignment-submission': {
            'url': '/assignment-submission',
            'name': 'E-Learning',
            'icon': <Elearning/>,

        },

        'MCQ': {
            'url': '/mcq/examlist',
            'name': 'Exam',
            'icon': <TCA/>,

        },
        'library': {
            'url': '/library/studentBook',
            'name': 'E-Library',
            'icon': <ELibrary/>,

        },
        'grade': {
            'url': '/grade',
            'name': 'Result',
            'icon': <Grade/>,

        },
        'payments': {
            'url': '/payment/student',
            'name': 'Payments',
            'icon': <Payment/>,
        },
        'messaging': {
            'url': '/messaging',
            'name': 'Messaging',
            'icon': <Message/>,
        },


    },
    'LIBRARIAN': {
        'student': {
            'url': '/student',
            'name': 'Students',
            'icon': <Students/>

        },

        'library': {
            'url': '/library',
            'name': 'E-Library',
            'icon': <ELibrary/>

        },
        'Library': {
            'url': '/Tab/issue/',
            'name': 'Issue',
            'icon': <Issue/>

        },

        'messaging': {
            'url': '/messaging',
            'name': 'Messaging',
            'icon': <Message/>,
        },
    },
    'MANAGEMENT': {

        'user': {
            'url': '/user',
            'name': 'Users',
            'icon': <Students/>,
        },

        'class-room': {
            'url': '/class-room',
            'name': 'Classroom',
            'icon': <Eclass/>,
            'menu': []
        },
        'subject': {
            'url': '/subject',
            'name': 'Subject',
            'icon': <Subject style={{fill:'white'}}/>,
        },

        'timetable': {
            'url': '/timetable',
            'name': 'Online-Class',
            'icon': <TimeTable/>,

        },

        'payments-config': {
            'url': '/payment/category',
            'name': 'Payments ',
            'icon': <Payment/>,

        },

        'marksheets': {
            'url': '/marksheets/listAllExams',
            'name': 'Grades',
            'icon': <Grade/>,
            'menu': []
        },

        'messaging': {
            'url': '/messaging',
            'name': 'Message',
            'icon': <Message/>,
        },

        'library': {
            'url': '/library/studentBook',
            'name': 'E-Library',
            'icon': <ELibrary/>,

        },
        'Alumini': {
            'url': '/alumini',
            'name': 'Alumini',
            'icon': <Alumni/>,
        },

    },
    'ACCOUNTANT': {

        'student': {
            'url': '/student',
            'name': 'Students',
            'icon': <User/>,
            'menu': [
                {
                    'name': 'Create Student',
                    'permission': 'CREATE_STUDENT_PERMISSION',
                    'url': '/student/create'
                },
            ]
        },
        'class-room': {
            'url': '/class-room/list',
            'name': 'Classroom',
            'icon': <Eclass/>,
            'menu': []
        },

        'payments': {
            'url': '/payments/accountant',
            'name': 'Payments',
            'icon': <Payment/>,

        },
        'messaging': {
            'url': '/messaging',
            'name': 'Message',
            'icon': <Message/>,
        },
    },
    'STAFF': {

        'messaging': {
            'url': '/messaging',
            'name': 'Message',
            'icon': <Message/>,
        },
        'library': {
            'url': '/library/studentBook',
            'name': 'E-Library',
            'icon': <ELibrary/>,

        }
    }


}

export default permissions
