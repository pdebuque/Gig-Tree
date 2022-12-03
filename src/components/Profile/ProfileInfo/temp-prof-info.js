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
        name: 'Kathy Romey',
        about_blurb: 'Director of Choirs, University of Minnesota'
    },
    {
        id: 2,
        name: 'Jerry Blackstone',
        about_blurb: 'Emeritus Director of Choirs, University of Michigan'
    },
    {
        id: 3,
        name: 'Carina Debuque',
        about_blurb: 'alto and lover of musical theater'
    }
]

export { _projects as projects };
export { _collaborators as collaborators }