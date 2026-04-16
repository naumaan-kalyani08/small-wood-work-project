
import { Table } from 'antd';
import { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './ResizableTable.css';

const ResizableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} style={{ ...restProps.style, userSelect: 'none' }} />
        </Resizable>
    );
};

export const ReusableTableStructure = ({ dataSource = [], columns = [], rowKey = 'key' } = {}) => {
    const [columnWidths, setColumnWidths] = useState(() => {
        const initialWidths = {};
        columns.forEach(col => {
            const colKey = col.key || col.dataIndex;
            initialWidths[colKey] = col.width || 150;
        });
        return initialWidths;
    });

    const handleResize = (key) => (event, { size }) => {
        setColumnWidths(prev => ({
            ...prev,
            [key]: size.width
        }));
    };

    const resizableColumns = columns.map(col => {
        const colKey = col.key || col.dataIndex;
        return {
            ...col,
            width: columnWidths[colKey],
            onHeaderCell: () => ({
                width: columnWidths[colKey],
                onResize: handleResize(colKey)
            })
        };
    });

    return (
        <Table
            dataSource={dataSource}
            columns={resizableColumns}
            rowKey={rowKey}
            components={{
                header: {
                    cell: ResizableTitle
                }
            }}
            scroll={{ x: true }}
        />
    );
}
export const ReusableCardLayout = () => {
    return (
        <div className="card bg-white p-4 rounded-lg shadow-lg">
            <h2 className='text-2xl font-bold mb-4'>Card Title</h2>
            <p>Card content goes here...</p>
        </div>
    )
}
export const ReusableInputField = ({ value, onchange, label, placeholder, type = 'text', inputSize = '', additionLabelClass = '', additionalInputClass = '', name = '' }) => {
    return (
        <div className={`mb-4 ${inputSize}`}>
            <label className={`block text-gray-700 text-sm font-bold mb-2 ${additionLabelClass}`} htmlFor={label}>
                {label}
            </label>
            <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${additionalInputClass}`}
                id={label}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onchange}
            />
        </div>
    );
}