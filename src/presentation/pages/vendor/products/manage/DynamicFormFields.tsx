import React from 'react';
import { Form, Input, Button, Space, Divider, InputNumber, Switch } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface DynamicVariantFormProps {
  name: string;
  label: string;
}

const DynamicVariantForm: React.FC<DynamicVariantFormProps> = ({ name, label }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <div className="form-list-header">
            <strong>{label}</strong>
          </div>
          {fields.map(({ key, name, ...restField }, index) => (
            <div key={key} style={{ marginBottom: 24 }}>
              <Divider variant="solid" style={{ borderColor: 'black' }}>
                Variant {index + 1}
                <CloseCircleOutlined
                  style={{ marginLeft: '10px', color: 'red' }}
                  onClick={() => remove(name)}
                />
              </Divider>

              {/* Variant Options - At least one type and value is required */}
              <Form.List name={[name, 'options']} initialValue={[{ key: '', value: '' }]}>
                {(optionFields) => (
                  <>
                    {optionFields.map(
                      ({ key: optionKey, name: optionName, ...optionRestField }) => (
                        <Space
                          key={optionKey}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...optionRestField}
                            name={[optionName, 'key']}
                            rules={[{ required: true, message: 'Please input variant type' }]}
                          >
                            <Input placeholder="Variant Type" readOnly />
                          </Form.Item>
                          <Form.Item
                            {...optionRestField}
                            name={[optionName, 'value']}
                            rules={[{ required: true, message: 'Please input variant value' }]}
                          >
                            <Input placeholder="Variant Value" readOnly />
                          </Form.Item>
                        </Space>
                      ),
                    )}
                  </>
                )}
              </Form.List>

              {/* Price, SKU, Stock, Discounted Price Fields */}
              <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'sku']}
                  rules={[{ required: true, message: 'Please input SKU' }]}
                >
                  <Input placeholder="SKU" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'price']}
                  rules={[{ required: true, message: 'Please input price' }]}
                >
                  <InputNumber min={0} placeholder="Price" style={{ width: 120 }} />
                </Form.Item>
                <Form.Item {...restField} name={[name, 'discountedPrice']}>
                  <InputNumber min={0} placeholder="Discounted Price" style={{ width: 160 }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'stock']}
                  rules={[{ required: true, message: 'Please input stock' }]}
                >
                  <InputNumber min={0} placeholder="Stock" style={{ width: 100 }} />
                </Form.Item>

                {/* isActive switch */}
                <Form.Item
                  {...restField}
                  name={[name, 'isActive']}
                  valuePropName="checked"
                  initialValue={true} // Default to true if the variant is active
                >
                  <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
              </Space>

              <Divider plain>Optional Specifications</Divider>

              {/* Specifications Form */}
              <Form.List name={[name, 'specifications']}>
                {(specFields) => (
                  <>
                    {specFields.map(({ key: specKey, name: specName, ...specRestField }) => (
                      <Space
                        key={specKey}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...specRestField}
                          name={[specName, 'key']}
                          rules={[{ required: true, message: 'Missing specification key' }]}
                        >
                          <Input placeholder="Specification Key" readOnly />
                        </Form.Item>
                        <Form.Item
                          {...specRestField}
                          name={[specName, 'value']}
                          rules={[{ required: true, message: 'Missing specification value' }]}
                        >
                          <Input placeholder="Specification Value" readOnly />
                        </Form.Item>
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </div>
          ))}

          {/* Ensure at least one variant */}
          <Form.Item>
            <Button
              type="primary"
              ghost
              onClick={() => add()}
              icon={<PlusOutlined />}
              style={{ marginTop: 16 }}
            >
              Add {label}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default DynamicVariantForm;
