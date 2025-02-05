from flask import Flask, render_template
import plotly.graph_objects as go
from plotly.subplots import make_subplots

app = Flask(__name__)

def create_sales_graph():
    # Sample data for winter coats (showing increasing growth trend)
    months = ['Eylül 2024', 'Ekim 2024', 'Kasım 2024']
    current_sales = [2850, 3620, 4750]  # More aggressive growth
    past_sales = [2450, 2980, 3680]     # Moderate growth

    # Create figure with secondary y-axis
    fig = make_subplots(specs=[[{"secondary_y": True}]])

    # Add traces
    fig.add_trace(
        go.Bar(
            name="Mevcut Koleksiyon",
            x=months,
            y=current_sales,
            marker_color='#4a90e2',
            opacity=0.9
        ),
        secondary_y=False,
    )

    fig.add_trace(
        go.Bar(
            name="Geçmiş Koleksiyon",
            x=months,
            y=past_sales,
            marker_color='#82ca9d',
            opacity=0.9
        ),
        secondary_y=False,
    )

    # Add percentage difference line
    percentage_diff = [(curr - past) / past * 100 
                      for curr, past in zip(current_sales, past_sales)]
    
    fig.add_trace(
        go.Scatter(
            name="Büyüme (%)",
            x=months,
            y=percentage_diff,
            line=dict(color='#ff9f43', width=3),
            mode='lines+markers+text',
            text=[f'+{diff:.1f}%' for diff in percentage_diff],
            textposition='top center'
        ),
        secondary_y=True,
    )

    # Update layout
    fig.update_layout(
        title_text="Kış Koleksiyonu Satış Karşılaştırması",
        template="plotly_dark",
        plot_bgcolor='#2d2d2d',
        paper_bgcolor='#2d2d2d',
        height=300,
        showlegend=True,
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1
        ),
        margin=dict(l=20, r=20, t=60, b=20)
    )

    # Update yaxis properties
    fig.update_yaxes(
        title_text="Satış Adedi",
        secondary_y=False,
        gridcolor='#404040',
        showgrid=True
    )
    fig.update_yaxes(
        title_text="Büyüme Oranı (%)",
        secondary_y=True,
        gridcolor='#404040',
        showgrid=False
    )

    # Update xaxis properties
    fig.update_xaxes(
        gridcolor='#404040',
        showgrid=True
    )

    return fig.to_html(
        full_html=False,
        include_plotlyjs=True,
        config={'displayModeBar': False}
    )

@app.route('/')
def index():
    sales_graph = create_sales_graph()
    return render_template('index.html', sales_graph=sales_graph)

if __name__ == '__main__':
    app.run(debug=True, port=5000)