interface MembersProps {
    selfName: string,
    members: string[]
}

const Members = (props: MembersProps) => {
    return (
        <div className="members">
            <SelfMember name="corsin"/>
            {props.members.map(n => <Member name={n}/>)}
        </div>
    )
}


interface MemberProps {
    name: string,
}

const Member = (props: MemberProps) =>
    <div className="member">
        <div className="name">{props.name}</div>
    </div>

const SelfMember = (props: MemberProps) =>
    <div className="member self">
        <div className="name">
            {props.name}
        </div>
    </div>

export default Members;
export type {MemberProps};