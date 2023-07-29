export default function Alert(props) {

    return (
      <div className="mt-2" style={{height: "50px"}}>
      {props.alert && 
          <div class={`alert alert-${props.alert.type}`} role="alert">
              <strong>{props.alert.msg}</strong>
          </div>}  
      </div>
  )

}