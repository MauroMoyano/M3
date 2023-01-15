import Card from './Card';

export default function Cards(props) {
   const { characters } = props;
   // characters[0] && console.log(characters)
   return <div>
      {
         characters.map(({name,species,gender,image, id}, index)=>{
            return(
            <Card
               key={index}
               name={name}
               species={species}
               gender={gender}
               image={image}
               onClose={props.onClose}
               id={id}
            />)
         })
      }
   </div>;
}
