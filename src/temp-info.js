/* placeholder data pre-database */

const _me = {
    first: 'Paolo',
    last: 'Debuque',
    bio: 'Hello! I am a conductor and tenor born and raised in the Twin Cities. I am currently the Chancel Choir Director at Good Samaritan UMC in Edina, and sing with a range of ensembles, primarily MNChorale and Border Crossing these days. Always down to chat about interesting projects. Also, hit me up if you have any web dev projects you\'d like a hand on!',
    location: 'Minneapolis, MN',
    available: 'Weekday evenings, especially Tuesday and Thursday',
    top_collab: ['collab-1', 'collab-2'],
    jobs: [
        {
            name: 'Chancel Choir Director',
            location: 'Good Samaritan UMC'
        },
        {
            name: 'Freelance singer',
            location: 'Twin Cities, MN'
        }
    ],
    member_since: 'Dec. 1, 2022'
}

const _projects = [
    {
        id: 1,
        name: 'Voices Rising: A Choral Affirmation of Black Lives',
        ensemble: 'Chorus America',
        location: 'Orchestra Hall',
        owner: 'Philip Shoultz',
        description: 'Voices Rising: A Choral Affirmation of Black Lives is a collaboration of 200 singers from 12 local choral organizations delivering a united artistic response to the murders of George Floyd and Daunte Wright that have placed the Twin Cities at the heart of our nation’s racial reckoning.',
        repertoire: [

        ],
        video_path: 'https://www.youtube.com/watch?v=Q4GYbMXS_DU&t=1417s&ab_channel=ChorusAmerica'
    },
    {
        id: 2,
        name: 'Requiem',
        ensemble: 'Requiem choir',
        location: 'Hamline University Methodist Church',
        owner: 'Paolo Debuque',
        description: 'Concert raising money for gun violence prevention',
        repertoire: [
            {
                name: 'Requiem',
                composer: 'Gabriel Fauré'
            },
            {
                name: 'Rise Up My Love',
                composer: 'Healey Willan'
            },
        ],
        video_path: ''
    }
]

const _collaborators = [
    {
        id: 1,
        collabs: 2,
        name: 'Jason Momoa',
        instrument: 'Aquaman',
        prof_pic: 'images/prof-pics/jason-momoa.jpeg'
    },
    {
        id: 2,
        collabs: 15,
        name: 'Scarlett Johannsen',
        instrument: 'Black Widow',
        prof_pic: 'images/prof-pics/scarjo.jpeg'
    },
    {
        id: 3,
        collabs: 3,
        name: 'Chadwick Boseman',
        instrument: 'Black Panther',
        prof_pic: 'images/prof-pics/chadwick-boseman.jpeg'
    },
    {
        id: 4,
        collabs: 40,
        name: 'Gustav Mahler',
        instrument: 'Conductor, Composer',
        prof_pic: 'images/prof-pics/gustav-mahler.jpeg'
    },
    {
        id: 5,
        collabs: 1,
        name: 'Yuja Wang',
        instrument: 'Pianist',
        prof_pic: 'images/prof-pics/yuja-wang.jpeg'
    },
    {
        id: 6,
        collabs: 6,
        name: 'Abel Selacoe',
        instrument: 'Cellist',
        prof_pic: 'images/prof-pics/abel-selacoe.jpeg'
    }
]

const _users = [
    {
        id: 0,
        name: 'Paolo Debuque',
        instrument: 'Conductor, Tenor',
        prof_pic: '/images/prof-pics/Paolo-prof-pic.png'
    },
    {
        id: 1,
        name: 'Jason Momoa',
        instrument: 'Aquaman',
        prof_pic: '/images/prof-pics/jason-momoa.jpeg'
    },
    {
        id: 2,
        name: 'Scarlett Johannsen',
        instrument: 'Black Widow',
        prof_pic: '/images/prof-pics/scarjo.jpeg'
    },
    {
        id: 3,
        name: 'Chadwick Boseman',
        instrument: 'Black Panther',
        prof_pic: '/images/prof-pics/chadwick-boseman.jpeg'
    },
    {
        id: 4,
        name: 'Gustav Mahler',
        instrument: 'Conductor, Composer',
        prof_pic: '/images/prof-pics/gustav-mahler.jpeg'
    },
    {
        id: 5,
        name: 'Yuja Wang',
        instrument: 'Pianist',
        prof_pic: '/images/prof-pics/yuja-wang.jpeg'
    },
    {
        id: 6,
        name: 'Abel Selacoe',
        instrument: 'Cellist',
        prof_pic: '/images/prof-pics/abel-selacoe.jpeg'
    }
]

export { _projects as projects };
export { _collaborators as collaborators }
export { _users as users }
export {_me as me}