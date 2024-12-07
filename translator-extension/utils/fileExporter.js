function exportTranslations(history) {
    const csvContent = history
      .map((item) => `${item.original},${item.translated},${item.date}`)
      .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "translations_history.csv";
    link.click();
  
    URL.revokeObjectURL(url);
  }
  