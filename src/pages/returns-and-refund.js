import Head from 'next/head';
import Layout from 'components/Layout';

function Home() {
    return (
        <Layout>
            <Head>
                <title>Returns And Refund policy</title>
            </Head>

            <h1
                css={{
                    margin: '2rem 0 ',
                    textAlign: 'center'
                }}
            >
                Returns And Refund policy
            </h1>
            <div>
                <h2>Return with USPS</h2>
                <p>
                    To return items via USPS, use the self-adhesive return label
                    included in your parcel. This label is pre-paid and
                    pre-addressed. The return shipping fee of $5.99 will
                    automatically be deducted from your refund. If you are an
                    H&M Loyalty Member, the return shipping fee will be waived.
                    If you have used or lost the pre-paid return label or the
                    Return Form, please contact us.
                </p>
                <p>
                    For designer items purchased on hm.com, we accept returns of
                    unworn, unwashed, and undamaged merchandise for full refund
                    within 7 days of receiving your order. Refunds will be made
                    in the form of the original payment. Orders may be returned
                    by mail or at any H&M store in the U.S., excluding Puerto
                    Rico. Visit hm.com to find your nearest H&M store. Please
                    refer to the Return Form in your parcel or the below 'Return
                    By Mail Following These Steps' section for further
                    instructions on how to return by mail.
                </p>
                <p>
                    If you do not wish to use the pre-paid return label, we
                    recommend that all returns be sent with a traceable carrier
                    such as USPS, UPS or FedEx. Keep the Return Tracking Number
                    from the package you are returning to ensure that the
                    package has been delivered to our warehouse. H&M is not
                    responsible for any packages sent with a return label not
                    provided by H&M. H&M does not accept C.O.D. deliveries.
                </p>
                <p>
                    The address to our warehouse is:
                    <br />
                    777 Lenin Street
                    <br />
                    Dock Door 499
                    <br />
                    Plainfield, IN 12345
                </p>
            </div>
            <div>
                <h2>Return by mail following these steps</h2>
                <div>
                    <p>
                        1. Fill out the Return Form using the code that best
                        explains your reason for returning.
                    </p>
                    <p>
                        2. Tear off the Return Form and place this together with
                        the item(s) you wish to return in a suitable bag or box,
                        e.g. the one you received your parcel in.
                    </p>
                    <p>
                        3. Attach the self-adhesive return label, which will be
                        included with your order, and take the parcel to any
                        USPS Mailbox or Post Office of your choice.
                    </p>
                </div>
            </div>
            <div>
                <h2>REFUNDS</h2>
                <h3>RETURN IN-STORE</h3>
                <p>
                    <i>This service is not available at the moment.</i>
                    Your refund will be issued in the form of original payment,
                    such as the credit card used for the order. Shipping and
                    handling costs are not refundable.
                </p>
                <h4>H&M Gift Cards</h4>
                <p>
                    If you used an H&M Gift Card together with another payment
                    method, we will first issue you an H&M Merchandise Card, and
                    the remaining balance will be refunded to the second payment
                    method used at purchase.
                </p>
                <h3>RETURN BY MAIL</h3>
                <p>
                    Your refund will be issued in the form of original payment,
                    such as the credit card used for the order. Shipping and
                    handling costs are not refundable.
                </p>
                <p>
                    You will receive a confirmation email when we have processed
                    your refund. Please allow up to two weeks for the credit to
                    post to your account. Please allow up to two billing cycles
                    for the credit to appear on your credit card statement.
                </p>
                <p>
                    Please note: You cannot exchange items online. If you prefer
                    items in another color, or size, just return the items you
                    don’t like and place a new order on hm.com.
                </p>
                <h4>H&M Gift Cards</h4>
                <p>
                    If you paid using a physical H&M Gift Card or H&M e-Gift
                    Card, all refunds will be issued to a new H&M e-Gift Card
                    with an updated balance to the email on file. If you paid
                    using an H&M Gift Card together with another payment method,
                    we will first issue you an H&M e-Gift Card, and the
                    remaining balance will be refunded to the second payment
                    method used at purchase.
                </p>
                <p>
                    For example, you placed an order totaling $100, and you paid
                    $25 with an H&M Gift Card and $75 with a credit card. You
                    decide to return $50 worth of items. We will refund $25 to
                    an H&M e-Gift Card and $25 to the credit card used at
                    purchase.
                </p>
            </div>
        </Layout>
    );
}

export default Home;
