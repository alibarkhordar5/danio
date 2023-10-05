import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props) {
    const { id, children } = props;

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

    const style = {
        width: 100,
        height: 100,
        padding: 20,
        border: '1px solid',
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}
