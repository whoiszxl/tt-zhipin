import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { CommonColor } from "../../../../common/CommonColor";

type Props = { tab: number; onTabChanged:(tabIndex: number) => void; onAddButtonPress:any};

export default ({ tab, onTabChanged, onAddButtonPress }: Props) => {
    const insets = useSafeAreaInsets();

    const [tabIndex, setTabIndex] = useState<number>(1);

    useEffect(() => {
        setTabIndex(tab);
    }, [tab]);

    return (
        <View style={styles.root}>

            <View style={[styles.titleBarLayout]}>


                {/** 标题栏-推荐 */}
                <TouchableOpacity activeOpacity={1} style={styles.tabTextButton}
                    onPress={() => {
                        setTabIndex(0);
                        onTabChanged?.(0);
                    }}
                >
                    <Text style={tabIndex === 0 ? styles.tabTextSelected : styles.tabText}>推荐</Text>
                    {tabIndex === 0 && <View style={styles.line} />}
                </TouchableOpacity>

                {/** 标题栏-附近 */}
                <TouchableOpacity activeOpacity={1} style={styles.tabTextButton}
                    onPress={() => {
                        setTabIndex(1);
                        onTabChanged?.(1);
                    }}
                >
                    <Text style={tabIndex === 1 ? styles.tabTextSelected : styles.tabText}>附近</Text>
                    {tabIndex === 1 && <View style={styles.line} />}
                </TouchableOpacity>


                {/** 标题栏-最新 */}
                <TouchableOpacity activeOpacity={1} style={styles.tabTextButton}
                    onPress={() => {
                        setTabIndex(2);
                        onTabChanged?.(2);
                    }}
                >
                    <Text style={tabIndex === 2 ? styles.tabTextSelected : styles.tabText}>最新</Text>
                    {tabIndex === 2 && <View style={styles.line} />}
                </TouchableOpacity>

                
            </View>

            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end', paddingRight: 10, backgroundColor: 'white'}}>
                    {/** 标题栏-搜索按钮 */}
                    <TouchableOpacity activeOpacity={1} style={styles.searchButton}>
                        <View style={styles.threeLineTag}>
                            <Text style={styles.threeLineTagText}>长沙</Text>
                            <Icon style={styles.clickIcon} name="play" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} style={styles.searchButton}>
                        <View style={styles.threeLineTag}>
                            <Text style={styles.threeLineTagText}>筛选</Text>
                            <Icon style={styles.clickIcon} name="play" />
                        </View>
                    </TouchableOpacity>
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

    titleBarLayout: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 2,
        flex: 1
    },

    addButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 12,
        marginRight: 42,
    },

    searchButton: {
        justifyContent: 'center',
    },

    line: {
        width: 0,
        height: 2,
        backgroundColor: '#ff2442',
        borderRadius: 1,
        position: 'absolute',
        bottom: 6,
    },

    tabTextButton: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10
    },

    tabText: {
        fontSize: 12,
        color: CommonColor.fontColor,
    },

    tabTextSelected: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold'
    },

    threeLineTag: {
        backgroundColor: CommonColor.tagBg,
        borderRadius: 3,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 5,
        flexDirection: "row",
        justifyContent: "center"
    },

    threeLineTagText: {
        color: CommonColor.deepGrey,
        fontSize: 10
    },

    clickIcon: {
        color: CommonColor.normalGrey,
        fontSize: 8,
        transform: [{ rotate: '90deg' }],
    }
});