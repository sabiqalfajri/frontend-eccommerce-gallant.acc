import { Section } from "@/components/common/Section"
import { LoadingPayment } from "@/components/shared/LoadingPayment";
import { TransactionPaid } from "@/components/user/transaction/TransactionPaid";
import { TransactionPending } from "@/components/user/transaction/TransactionPending";
import { useTransaction } from "@/hooks/transaction/useTransaction";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { useToken } from "@/hooks/universal/useToken";
import { showError } from "@/utils/Toast";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Transaction = () => {
    const { token } = useToken();
    const { orderId } = useParams();
    const { 
        transaction, 
        isLoadingTransaction, 
        isFetchedTransaction, 
        isErrorTransaction, 
        refetch,
        isRefetchingTransaction
    } = useTransaction(token!, orderId!);
    const loadingTransaction = isLoadingTransaction || !isFetchedTransaction;
    const smoothLoading = useSmoothLoading(loadingTransaction);
    const navigate = useNavigate();

    useEffect(() => {
        if(smoothLoading) return;
        if(isErrorTransaction || !transaction) {
            showError("Transaction not found or canceled")
            navigate('/cart');
            return;
        };

        const invalidStatus = ["CANCELED", "EXPIRED", "FAILED", "REFUNDED"]
        if(invalidStatus.includes(transaction.status)) {
            showError(
                transaction.status === 'EXPIRED'
                ? 'QRIS telah kadaluarsa. Silahkan buat pesanan ulang.'
                : 'Transaksi dibatalkan.'
            );
            navigate('/cart', { replace: true });
            return;
        }
    }, [smoothLoading, isFetchedTransaction, transaction, isErrorTransaction, navigate])

    return (
        <Section wrapperClassName="bg-gray-100 min-h-[calc(100vh-72px)]">
            {smoothLoading && <LoadingPayment />}
            {!smoothLoading && transaction && transaction.status === 'PENDING' && 
                <TransactionPending 
                transaction={transaction} 
                isRefetching={isRefetchingTransaction}
                refetch={refetch}
                />
            }
            {!smoothLoading && transaction && transaction.status === 'PROCESSING' && <TransactionPaid />}
        </Section>
    )
}