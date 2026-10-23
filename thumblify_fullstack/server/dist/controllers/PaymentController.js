export const processPayment = (req, res) => {
    const { plan, amount, userId } = req.body;
    const success = Math.random() > 0.2;
    if (success) {
        res.json({
            status: "success",
            plan,
            amount,
            transactionId: "TXN" + Date.now()
        });
    }
    else {
        res.status(400).json({
            status: "failed"
        });
    }
};
