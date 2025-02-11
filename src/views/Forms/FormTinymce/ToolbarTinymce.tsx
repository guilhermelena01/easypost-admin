import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Col, Card } from "react-bootstrap";

const ToolbarTinymce = () => {
    const editorConfig = {
        height: 400,
        menubar: true,
        content_style: 'body { font-family: "Inter", sans-serif; }',
    }
    return (
        <React.Fragment>
            <Col lg={6}>
                <Card>
                    <Card.Header>
                        <h5>TinyMCE with Toolbar</h5>
                    </Card.Header>
                    <Card.Body>
                        <Editor
                            apiKey="YOUR_API_KEY"
                            initialValue={`<p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tiny.cloud/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" ></p>
        <h2 style="text-align: center;">Welcome to the TinyMCE Cloud demo!</h2>
        <h5 style="text-align: center;">Note, this includes some "enterprise/premium" features.<br>Visit the <a href="https://www.tiny.cloud/pricing">pricing page</a> to learn more about our premium plugins.</h5>
        <p>Please try out the features provided in this full featured example.</p>
    
        <h2>Got questions or need help?</h2>
        <ul>
          <li>Our <a class="mceNonEditable" href="https://www.tiny.cloud/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
          <li>Have a specific question? Visit the <a class="mceNonEditable" href="https://community.tiny.cloud/forum/">Community Forum</a>.</li>
          <li>We also offer enterprise grade support as part of <a href="https://www.tiny.cloud/pricing">TinyMCE premium subscriptions</a>.</li>
        </ul>
    
        <h2>A simple table to play with</h2>
        <table style="border-collapse: collapse; width: 100%;" border="1">
          <thead>
            <tr>
              <th>Product</th>
              <th>Cost</th>
              <th>Really?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TinyMCE Cloud</td>
              <td>Get started for free</td>
              <td>YES!</td>
            </tr>
            <tr>
              <td>Plupload</td>
              <td>Free</td>
              <td>YES!</td>
            </tr>
          </tbody>
        </table>
    
        <h2>Found a bug?</h2>
        <p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
    
        <h2>Finally ...</h2>
        <p>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
        <p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.</p>`}
                            init={editorConfig}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default ToolbarTinymce;