package APP_PACKAGE;

import android.content.Context;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.ParcelFileDescriptor;
import android.print.PageRange;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Lets the page print. Inside an Android app, window.print() does nothing, so the page calls
 * Printer.print() instead: it opens Android's own print screen (printers, or "Save as PDF").
 * It answers only when the print job is finished, so the page keeps its print layout until then.
 */
@CapacitorPlugin(name = "Printer")
public class PrintPlugin extends Plugin {
    @PluginMethod
    public void print(PluginCall call) {
        final String name = call.getString("name", "Binder Blueprint");
        getActivity().runOnUiThread(() -> {
            PrintManager pm = (PrintManager) getActivity().getSystemService(Context.PRINT_SERVICE);
            final PrintDocumentAdapter inner = getBridge().getWebView().createPrintDocumentAdapter(name);
            PrintDocumentAdapter outer = new PrintDocumentAdapter() {
                @Override public void onStart() { inner.onStart(); }
                @Override public void onLayout(PrintAttributes o, PrintAttributes n, CancellationSignal c, LayoutResultCallback cb, Bundle b) { inner.onLayout(o, n, c, cb, b); }
                @Override public void onWrite(PageRange[] p, ParcelFileDescriptor d, CancellationSignal c, WriteResultCallback cb) { inner.onWrite(p, d, c, cb); }
                @Override public void onFinish() { inner.onFinish(); call.resolve(); }
            };
            PrintAttributes attrs = new PrintAttributes.Builder()
                .setMediaSize(PrintAttributes.MediaSize.NA_LETTER)
                .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                .build();
            pm.print(name, outer, attrs);
        });
    }
}
