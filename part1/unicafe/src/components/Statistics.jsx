import StatisticsLine from "./StatisticsLine";
const Statistics = (props) => {

    const all = props.good + props.neutral + props.bad;
    let average = props.good - props.bad / all;
    let positive = `${(props.good / all * 100)}%`;
        return (
            <div>
                <table>
                    <tbody>
                        <StatisticsLine text = "good  " value = {props.good} />
                        <StatisticsLine text = "neutral  " value = {props.neutral} /> 
                        <StatisticsLine text = "bad  " value = {props.bad} /> 
                        <StatisticsLine text = "all  " value = {all} /> 
                        <StatisticsLine text = "average  " value = {average} /> 
                        <StatisticsLine text = "positive  " value = {positive} />
                    </tbody>
                </table> 
            </div>
    )
}

export default Statistics;