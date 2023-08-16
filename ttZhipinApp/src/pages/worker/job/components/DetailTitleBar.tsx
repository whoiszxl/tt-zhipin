import React, { } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { CommonColor } from "../../../../common/CommonColor";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';


type Props = { onTabChanged:(tabIndex: number) => void; onAddButtonPress:any};

export default () => {

    return (
        <View style={styles.root}>

            <View style={styles.titleLayout}>

                <View style={styles.jobLayout}>
                    <Text style={styles.jobLayoutName}>后端开发工程师-长沙</Text>
                    <Text style={styles.jobLayoutSalary}>10-15K</Text>
                </View>

                <View style={{paddingHorizontal: 10, paddingTop: 10, flexDirection: "row"}}>

                     <View style={[styles.tagLayout, {paddingLeft: 0}]}>
                        <Ionicons style={styles.genderIcon} name={'location-sharp'} size={12} color={CommonColor.deepGrey} />

                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.addressCommonText}>{'湖南省'}</Text>
                            <Text style={[styles.addressCommonText]}>·</Text>
                            <Text style={styles.addressCommonText}>{'长沙'}</Text>
                            <Text style={[styles.addressCommonText]}>·</Text>
                            <Text style={[styles.addressCommonText]}> {'岳麓区'} </Text>

                        </View>
                    </View>
                    
                    <View style={styles.tagLayout}>
                        <Ionicons style={styles.genderIcon} name={'document'} size={12} color={CommonColor.deepGrey} />

                        <Text style={styles.addressCommonText}>3-5年</Text>
                    </View>

                    <View style={styles.tagLayout}>
                        <Octicons style={styles.genderIcon} name={'mortar-board'} size={12} color={CommonColor.deepGrey} />

                        <Text style={styles.addressCommonText}>本科</Text>
                    </View>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row", 
        justifyContent: 'space-between', 
        width: '100%'
    },

    titleLayout: {
        flexDirection: 'column', 
        flex: 1, 
        justifyContent: 'flex-start', 
        paddingRight: 10, 
        backgroundColor: 'white',
    },

    jobLayout: {
        paddingHorizontal: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingTop: 8
    },

    jobLayoutName: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },

    jobLayoutSalary: {
        color: CommonColor.mainColor,
        fontSize: 14,
        fontWeight: 'bold'
    },

    tagLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 1,
        borderRadius: 3,
        paddingLeft: 10
    },
    
    genderIcon: {
        paddingRight: 2
    },

    addressCommonText: {
        fontSize: 10,
        color: CommonColor.deepGrey
      },

});