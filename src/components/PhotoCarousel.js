import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar, Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from "react-native";

const PhotoCarousel = (props) => {

    // const { photos } = props;
    const photos = [{
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        photo: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        photo: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        photo: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        photo: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        photo: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        photo: 'https://i.imgur.com/lceHsT6l.jpg'
    }];

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                <Card>
                    <Card.Cover source={{ uri: item?.photo }} />
                    <Card.Content>
                        <Title>{item?.title}</Title>
                        <Paragraph>{item?.subtitle}</Paragraph>
                    </Card.Content>
                </Card>
            </View>
        );
    }

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    
    // const _carousel = React.createRef(null);

    return (
        <View style={styles.container}>
            <Carousel
                // ref={(c) => { _carousel = c; }}
                data={photos}
                renderItem={_renderItem}
                sliderWidth={Math.floor(screenWidth * .8)}
                itemWidth={Math.floor(screenHeight * .29)}
                layout={'default'}
                firstItem={0}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: '5%'
    },
    image: {
        height: 200,
        // width: 200
    }
});

export default PhotoCarousel;