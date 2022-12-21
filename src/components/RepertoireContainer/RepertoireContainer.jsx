import RepertoireItem from '../RepertoireItem/RepertoireItem'


export default function RepertoireContainer ({number}) {

const items = []

const renderItems = () =>{
  for (let i=0; i<=number; i++){
    items.push(<RepertoireItem/>)
  }
  return 
}

  return(
    <div>
      {renderItems}
    </div>
  )
}