import Input from '../Input/Input';


interface InlineEditProps {
    index: number;
    value: string;
    setValue: (newState: string, index: number) => void;
    eventName: string;
    className: string;
}

const InlineEdit: React.FC<InlineEditProps> = ({ index, value, setValue, eventName, ...props }) => {
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value, index);

    return (
        <textarea
            aria-label="Event name"
            value={value}
            onChange={onChange}
            name={eventName}
            className={props.className}
        />
    )
}

export default InlineEdit;