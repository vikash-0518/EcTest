import React, { useState, useEffect } from 'react'
import { View, FlatList,ActivityIndicator } from 'react-native'
import NewsCard from './components/NewsCard'
import newAPI  from './apis/News'

const LatestNews = ({ navigation }) => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getNewsFromAPI()
    }, [])

    function getNewsFromAPI() {
        setLoading(true);
        newAPI.get('everything?q=bitcoin&from=2021-07-23&sortBy=publishedAt&apiKey=4b068317b55b4887af65abc7243abb0f')
            .then(async function (response) {
                setNews(response.data);
                setLoading(false);
                
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    if (!news) {
        return null
    }

   
    
    return (
        <View style={{flex:1,justifyContent:'center'}}>
              {loading ? (
                        
                     <ActivityIndicator size="large" color="#00ff00"/> 
                        
                      ) : (
                        <FlatList data={news.articles}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({item}) => {
                            
                           return  <NewsCard item = {item}/>
                        }}
                    />
                      )}
                     
           
        </View>
    )
}

export default LatestNews