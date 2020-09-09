/*
整个程序的入口
 从store中获取必要的数据（使用connect）
倒出被connext包裹好的内容
*/
import { connect } from 'react-redux';
import './App.css'

function App(props) {

}

export default connect(
    function mapStateToProps(state) {},
    function mapDispatchToProps(dispatch) {},
)
