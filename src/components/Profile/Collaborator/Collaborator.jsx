import './Collaborator.css'

export default function Collaborator({ collaborator }) {
    return (
        <a class="collaborator-link" href={`/${collaborator.name}/profile`}>
            <div className='collaborator-container'>
                <div className="collab-color-code"></div>
                <div className='collab-all-info'>
                    <div className='collab-prof-pic-container'>
                        <img className='collab-prof-pic' src={collaborator.prof_pic} alt={`${collaborator.name}'s profile picture`} />
                    </div>
                    <div className='collab-name-inst'>
                        <h4 className='collab-name'>{collaborator.name}</h4>
                        <p className='collab-inst'>{collaborator.instrument}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}





