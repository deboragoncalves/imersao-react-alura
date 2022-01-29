import config from '../config.json';

const TextComponent = (props) => {

    // Tag dinâmica - default h1
    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${config.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    )
}

export default TextComponent;