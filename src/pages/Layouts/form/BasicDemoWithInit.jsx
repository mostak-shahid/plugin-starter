import React, { useState } from 'react';
import { Form, Col, Row, Button, Card, Toast } from '@douyinfe/semi-ui';
import { IconUpload } from '@douyinfe/semi-icons';
import {BoxedLayout} from '../../../layouts';
const BasicDemoWithInit = () => {
    const [initValues] = useState({
        name: 'semi',
        business: ['ulikeCam'],
        role: 'ued',
        switch: true,
        files: [
            {
                uid: '1',
                name: 'vigo.png',
                status: 'success',
                size: '130KB',
                preview: true,
                url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/vigo.png'
            },
            {
                uid: '2',
                name: 'resso.jpeg',
                status: 'validateFail',
                size: '222KB',
                percent: 50,
                preview: true,
                fileInstance: new File(
                    [new ArrayBuffer(2048)],
                    'resso.jpeg',
                    { type: 'image/jpeg' }
                ),
                url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Resso.png'
            },
            {
                uid: '3',
                name: 'dy.jpeg',
                status: 'uploading',
                size: '222KB',
                percent: 50,
                preview: true,
                fileInstance: new File(
                    [new ArrayBuffer(2048)],
                    'dy.jpeg',
                    { type: 'image/jpeg' }
                ),
                url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png'
            }
        ]
    });

    const {
        Input,
        InputNumber,
        Select,
        Cascader,
        DatePicker,
        TimePicker,
        TextArea,
        CheckboxGroup,
        Checkbox,
        RadioGroup,
        Radio,
        Slider,
        Rating,
        Switch,
        TagInput,
        Section,
        TreeSelect,
    } = Form;

    const plainOptions = ['A', 'B', 'C'];
    const style = { width: '90%' };

    const treeData = [
        {
            label: 'Asia',
            value: 'Asia',
            key: '0',
            children: [
                {
                    label: 'China',
                    value: 'China',
                    key: '0-0',
                    children: [
                        { label: 'Beijing', value: 'Beijing', key: '0-0-0' },
                        { label: 'Shanghai', value: 'Shanghai', key: '0-0-1' },
                    ],
                },
            ],
        },
        {
            label: 'North America',
            value: 'North America',
            key: '1',
        }
    ];
    const handleSubmit = (values) => {
        console.log(values);
        Toast.info('Submit Success');
    };

    return (
        <BoxedLayout>
            <Card title="Basic Form">
                <Form
                    initValues={initValues}
                    style={{ padding: 10, width: '100%' }}
                    onValueChange={(v) => console.log(v)}
                    onSubmit={values => handleSubmit(values)}
                >
                    <Section text="Basic Info">
                        <Row>
                            <Col span={12}>
                                <Input
                                    field="name"
                                    label="Name（Input）"
                                    initValue="mikeya"
                                    style={style}
                                    trigger="blur"
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    field="date"
                                    label="Date（DatePicker）"
                                    style={style}
                                    initValue={new Date()}
                                    placeholder="Choose date"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                
                                <Input
                                    field="nickName1"
                                    label="With rules"
                                    style={{ width: '250px' }}
                                    trigger='blur'
                                    rules={[
                                        { required: true, message: 'required error' },
                                        { type: 'string', message: 'type error' },
                                        { validator: (rule, value) => value === 'semi', message: 'not semi' }
                                    ]}
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    field="date"
                                    label="Date（DatePicker）"
                                    style={style}
                                    initValue={new Date()}
                                    placeholder="Choose date"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Select field="role" style={style} label="Role（Select）">
                                    <Select.Option value="qa">Quality Assurance</Select.Option>
                                    <Select.Option value="rd">Software Engineer</Select.Option>
                                    <Select.Option value="pm">Product Manager</Select.Option>
                                    <Select.Option value="ued">Designer</Select.Option>
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Select
                                    field="business"
                                    multiple
                                    style={style}
                                    label="Application（Multiple Select）"
                                >
                                    <Select.Option value="semi">Semi</Select.Option>
                                    <Select.Option value="ulikeCam">UlikeCam</Select.Option>
                                    <Select.Option value="xigua">BuzzVideo</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Cascader
                                    field="area"
                                    label="Area（Cascader）"
                                    treeData={treeData}
                                    style={style}
                                />
                            </Col>
                            <Col span={12}>
                                <TreeSelect
                                    field="tree"
                                    label="Node（TreeSelect）"
                                    treeData={treeData}
                                    style={style}
                                    filterTreeNode
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <TagInput
                                    field="product"
                                    label="Product（TagInput）"
                                    initValue={['abc', 'ulikeCam']}
                                    style={style}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Upload
                                    field="files"
                                    label="Files（Upload）"
                                    action="//semi.design/api/upload"
                                >
                                    <Button icon={<IconUpload />} theme="light">
                                        Click to upload
                                    </Button>
                                </Form.Upload>
                            </Col>
                        </Row>
                    </Section>

                    <Section text="Source Detail">
                        <Row>
                            <Col span={12}>
                                <TextArea
                                    field="description"
                                    label="Apply Reason（TextArea）"
                                    style={style}
                                />
                            </Col>
                            <Col span={12}>
                                <CheckboxGroup
                                    field="type"
                                    label="Apply type（CheckboxGroup）"
                                    initValue={['user', 'admin']}
                                >
                                    <Checkbox value="admin">admin</Checkbox>
                                    <Checkbox value="user">user</Checkbox>
                                    <Checkbox value="guest">guest</Checkbox>
                                    <Checkbox value="root">root</Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <RadioGroup
                                    field="isMonopolize"
                                    label="Whether exclusive resources（Radio）"
                                >
                                    <Radio value={1}>Yes</Radio>
                                    <Radio value={0}>No</Radio>
                                </RadioGroup>
                            </Col>
                            <Col span={12}>
                                <CheckboxGroup
                                    options={plainOptions}
                                    field="checkbox"
                                    label="Type（CheckboxGroup）"
                                    direction="horizontal"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <TimePicker field="time" label="End Time（TimePicker）" style={style} />
                            </Col>
                            <Col span={12}>
                                <InputNumber
                                    field="number"
                                    label="Number of applications（InputNumber）"
                                    initValue={20}
                                    style={style}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Slider
                                    field="range"
                                    label="Resource usage alarm threshold(%)（Slider）"
                                    initValue={10}
                                    style={style}
                                />
                            </Col>
                            <Col span={12}>
                                <Switch field="switch" label="Switch（Switch）" />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Rating
                                    field="rating"
                                    label="Satisfaction（Rating）"
                                    initValue={2}
                                    style={style}
                                />
                            </Col>
                        </Row>
                    </Section>

                    <Checkbox field="agree" noLabel>
                        I have read and understood the relevant regulations（Checkbox）
                    </Checkbox>

                    <Button type="primary" htmlType="submit" className="btn-margin-right">
                        Submit
                    </Button>
                    <Button htmlType="reset">Reset</Button>
                </Form>
            </Card>
        </BoxedLayout>
    );
};

export default BasicDemoWithInit;
