import { Form, Input } from 'antd';

const CheckoutAddress = () => {
  return (
    <>
      <Form.Item 
        name="name"
        label="Full name"
        extra="First and last name. For example: John Smith"
        rules={[{ required: true, message: 'Please enter your Full name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="address1"
        label="Address line 1"
        extra="For example: street address, PO box, company name, c/o"
        rules={[{ required: true, message: 'Please enter your Address line 1' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="address2"
        label="Address line 2"
        extra="For example: apartment, suite, unit, building, floor"
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="city"
        label="Town/City"
        rules={[{ required: true, message: 'Please enter your Town/City' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="state"
        label="County/State"
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="postcode"
        label="Postcode/ZIP"
        extra="If you don't have a postcode or ZIP, please write 'No Postcode'"
        rules={[{ required: true, message: "Please enter your postcode/ZIP or write 'No Postcode'" }]}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default CheckoutAddress;
