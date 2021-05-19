export const Alert = (props) => {
    console.log(props)
    return (
        <div className={'alert w-full alert-' + props.type}>
            {props.msg}
        </div>
    )
}