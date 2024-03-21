import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../components/Container';
import TitleComponent from '../components/TitleComponent';
import TextComponent from '../components/TextComponent';
import { TaskModel } from '../models/TaskModel';
import SectionComponent from '../components/SectionComponent';
import InputComponent from '../components/InputComponent';
import { SearchNormal1 } from 'iconsax-react-native';
import { colors } from '../constants/colors';

const ListTasks = ({ navigation, route }: any) => {

    const { tasks }: { tasks: TaskModel[] } = route.params;

    const [searchKey, setSearchKey] = useState('')
    const [results, setResults] = useState<TaskModel[]>([])

    useEffect(() => {
        if (!searchKey){
            setResults([])
        } else {
            const items = tasks.filter(element => element.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()))

            setResults(items)
        }

    }, [searchKey])

    return (
        <Container back>
            <SectionComponent>
                <InputComponent value={searchKey} onChange={val => setSearchKey(val)}
                allowClear
                prefix={<SearchNormal1 size={20} color={colors.gray2} />}
                placeHolder='Search'
                />
            </SectionComponent>
            <FlatList style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                data={searchKey ? results : tasks}

                ListEmptyComponent={
                    <SectionComponent>
                        <TextComponent text='Data not found'/>
                    </SectionComponent>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity style={{
                        marginBottom: 24,
                        paddingHorizontal: 16
                    }}
                        onPress={() => navigation.navigate('TaskDetail', {
                            id: item.id,
                        })}
                        key={item.id}
                    >
                        <TitleComponent text={item.title} />
                        <TextComponent text={item.description} line={2} />
                    </TouchableOpacity>
                )} />
        </Container>
    )
}

export default ListTasks
