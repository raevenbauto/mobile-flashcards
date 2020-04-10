import React from "react";
import {Card, View} from "native-base";
import {Text, TouchableOpacity} from "react-native";
import {numOfQuestionsFormatter} from "../utils/helper";

export function DeckItem(props){
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <Card style={{padding: 20}}>
                    <View style={{justifyContent: "center", alignItems: "flex-end", alignContent: "flex-end"}}>
                    </View>

                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 30}}>
                                {props.title}
                            </Text>
                        </View>

                        <Text>
                            {numOfQuestionsFormatter(props.questionCount)}
                        </Text>
                    </View>
                </Card>
            </TouchableOpacity>
        </View>
    )
}
