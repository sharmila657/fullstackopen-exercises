const Header = (props) => {
    console.log(props);

    return (
        <h1>
            {props.title1}
            {props.title2}
        </h1>
    )
}

export default Header;