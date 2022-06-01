import './App.css';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer'
import Content from './Components/Content/сontent';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AppRoutes } from './common/constants';
import AddArticle from './Components/Article/addArticle';
import Posts from './Components/Posts/posts';
import ArticleList from './Components/Article/article';
import PostsMain from './Components/Posts/postsMain';
import UpdateArticle from './Components/Article/updateArticle';
import Auth from './Components/Auth/authSignIn';
import Registration from './Components/Auth/authSignUp';

function App() {
  return (
    <BrowserRouter>
      <div className='frame'>
        <div className='app-wrapper'>
          <Header />
          <Content>
          <Routes>
            <Route path={AppRoutes.ALL} element = {<PostsMain />}/>
            <Route path={AppRoutes.REVIEW} element = {<Posts />}/>
            <Route path={AppRoutes.CYCLING} element = {<Posts />}/>
            <Route path={AppRoutes.ADVICE} element = {<Posts />}/>
            <Route path={AppRoutes.TRAINING} element = {<Posts />}/>
            <Route path={AppRoutes.REPAIR} element = {<Posts />}/>
            <Route path={AppRoutes.ENTRY} element = {<Auth />}/>
            <Route path={AppRoutes.REG} element = {<Registration />}/>
            <Route path = {AppRoutes.ADD + "/:theme"} element = {<AddArticle />}/>
            <Route path = {"/:theme" + AppRoutes.ARTICLE +"/:id"} element = {<ArticleList />} />
            <Route path = {"/:theme" + AppRoutes.ARTICLE +"/:id/update"} element = {<UpdateArticle />} />
          </Routes>
          </Content>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
