/* placeholder data pre-database */

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

export { _projects as projects };
export { _collaborators as collaborators }