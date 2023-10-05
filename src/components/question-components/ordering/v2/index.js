// general imports
import { useState, useEffect } from 'react';
// @dnd-kit
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
// custom components
import { SortableItem } from './SortableItem';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------------------

// none of your business
function Grid({ children }) {
    return (
        <div
            style={{
                display: 'inline-grid',
                gridTemplateColumns: `repeat(${children.length}, 1fr)`,
                gridGap: 10,
            }}
        >
            {children}
        </div>
    );
}

// converts each array in tags to a svg
function ArraySvg({ array }) {
    const svgTags = [];

    switch (array.length) {
        case 1:
            svgTags.push(
                <text x={50} y={50} textAnchor="middle" dominantBaseline="middle">
                    {array[0]}
                </text>
            );
            break;
        case 2:
            svgTags.push(
                <text x={50} y={30} textAnchor="middle" dominantBaseline="middle">
                    {array[0]}
                </text>,
                <line x1={30} y1={50} x2={70} y2={50} stroke="black" strokeWidth={2} />,
                <text x={50} y={75} textAnchor="middle" dominantBaseline="middle">
                    {array[1]}
                </text>
            );
            break;
        default: // 3
            svgTags.push(
                <text x={30} y={50} textAnchor="middle" dominantBaseline="middle">
                    {array[0]}
                </text>,
                <text x={60} y={30} textAnchor="middle" dominantBaseline="middle">
                    {array[1]}
                </text>,
                <line x1={40} y1={50} x2={80} y2={50} stroke="black" strokeWidth={2} />,
                <text x={60} y={75} textAnchor="middle" dominantBaseline="middle">
                    {array[2]}
                </text>
            );
            break;
    }

    return (
        <svg width="100%" viewBox="0 0 100 100" style={{ fontFamily: 'PersianNumber', fontSize: '2rem' }}>
            {svgTags}
        </svg>
    );
}

export default function Ordering(props) {
    const { showingAttrs, setUser_answer, answerToPut } = props;
    const { id = 'ans', tags = [] } = showingAttrs;
    // acceptable formats for tags: [[1], [2, 3], [4, 5, 6]]

    // none of your business
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [tagIds, setTagIds] = useState(new Array(tags.length).fill(0).map((value, index) => String(index)));

    // name is self-explanatory
    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setTagIds((tagIds) => {
                const oldIndex = tagIds.findIndex((value) => value === active.id);
                const newIndex = tagIds.findIndex((value) => value === over.id);

                return arrayMove(tagIds, oldIndex, newIndex);
            });
        }
    }

    // update tags from tagIds (and vice versa) or answerToPut
    useEffect(() => {
        if (!(answerToPut && answerToPut[id]) && setUser_answer) {
            setUser_answer(
                id,
                tagIds.map((id) => tags[parseInt(id)])
            );
        }
    }, [tagIds]);

    useEffect(() => {
        if (answerToPut && answerToPut[id]) {
            setTagIds(
                answerToPut[id].map((array) =>
                    String(tags.findIndex((value) => JSON.stringify(value) === JSON.stringify(array)))
                )
            );
        }
    }, [answerToPut]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', direction: 'rtl' }}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tagIds.map((id) => id)} strategy={rectSortingStrategy}>
                    <Grid>
                        {tagIds.map((id) => (
                            <SortableItem key={id} id={id}>
                                <ArraySvg array={tags[parseInt(id)]} />
                            </SortableItem>
                        ))}
                    </Grid>
                </SortableContext>
            </DndContext>
        </Box>
    );
}
